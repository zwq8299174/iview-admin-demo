<template>
<div>
	<Form class="query-form" ref="form" :model="form" inline>
		<FormItem prop="id" label="编号">
			<Input type="text" v-model="form.id" clearable></Input>
		</FormItem>
		<FormItem prop="teacherNo" label="工号">
			<Input type="text" v-model="form.teacherNo" clearable></Input>
		</FormItem>
		<FormItem prop="teacherName" label="教师姓名">
			<Input type="text" v-model="form.teacherName" clearable></Input>
		</FormItem>
		<FormItem prop="gender" label="性别">
			<dict-item v-model="form.gender" label="sex"></dict-item>
		</FormItem>
		<FormItem prop="campus" label="归属校区" class="hastree">
			<tree-dropdown :isAsync="true" type="office" v-model="form.campus" :listData="{}" placeholder="请选择机构"></tree-dropdown>
		</FormItem>
		<FormItem prop="adviser" label="归属顾问" class="hastree">
			<tree-dropdown :isAsync="true" type="user" v-model="form.adviser" :listData="{}" placeholder="请选择用户"></tree-dropdown>
		</FormItem>
		<FormItem prop="leaveDate" label="离校时间开始日期">
			<DatePicker :editable="false" :value="form.beginLeaveDate" type="datetime" @on-change="form.beginLeaveDate=$event" placeholder="选择离校时间开始日期"></DatePicker>
		</FormItem>
		<FormItem prop="leaveDate" label="离校时间结束日期">
			<DatePicker :editable="false" :value="form.endLeaveDate" type="datetime" @on-change="form.endLeaveDate=$event" placeholder="选择离校时间结束日期"></DatePicker>
		</FormItem>
		<FormItem>
			<Button type="primary" @click="query('form')">查询</Button>
		</FormItem>
	</Form>
	<div class="add-button-wrapper">
		<Button type="primary" @click="add">添加单表</Button>
	</div>
	<Table border :data="tableData" :columns="tableColumns" stripe :loading="loading"></Table>
	<div style="margin: 10px;overflow: hidden" v-if="total>pageSize">
		<div style="float: right;">
			<Page :total="total" :current="currPage" @on-change="changePage"></Page>
		</div>
	</div>
	<Modal v-model="modal" :title="modalTitle" @on-ok="modalEdit" @on-cancel="modalCancel" @on-visible-change="modalChange">
		<Form class="modal-form" ref="modalForm" :model="modalForm" :rules="rules" :label-width="80">
			<FormItem prop="id" label="id" class="fn-hide">
				<Input type="text" v-model="modalForm.id" clearable></Input>
			</FormItem>
			<FormItem prop="teacherNo" label="工号">
				<Input type="text" v-model="modalForm.teacherNo" clearable></Input>
			</FormItem>
			<FormItem prop="teacherName" label="教师姓名">
				<Input type="text" v-model="modalForm.teacherName" clearable></Input>
			</FormItem>
			<FormItem prop="gender" label="性别">
				<dict-item :transfer="true" v-model="modalForm.gender" label="sex"></dict-item>
			</FormItem>
			<FormItem prop="age" label="年龄">
				<Input type="text" v-model="modalForm.age" clearable></Input>
			</FormItem>
			<FormItem prop="birthday" label="生日">
				<Input type="text" v-model="modalForm.birthday" clearable></Input>
			</FormItem>
			<FormItem prop="contactPhone" label="联系电话">
				<Input type="text" v-model="modalForm.contactPhone" clearable></Input>
			</FormItem>
			<FormItem prop="campus" label="归属校区" class="hastree">
				<tree-dropdown :isAsync="true" type="office" v-model="modalForm.campus" :listData="{}" placeholder="请选择机构"></tree-dropdown>
			</FormItem>
			<FormItem prop="remarks" label="备注">
				<Input v-model="modalForm.remarks" type="textarea" :rows="4" placeholder="请输入备注"></Input>
			</FormItem>
			<FormItem prop="adviser" label="归属顾问" class="hastree">
				<tree-dropdown :isAsync="true" type="user" v-model="modalForm.adviser" :listData="{}" placeholder="请选择用户"></tree-dropdown>
			</FormItem>
			<FormItem prop="leaveDate" label="离校时间">
				<DatePicker :editable="false" :value="modalForm.leaveDate" type="datetime" @on-change="form.leaveDate=$event" placeholder="选择离校时间开始日期"></DatePicker>
			</FormItem>
		</Form>
		<div slot="footer">
			<Button type="primary" @click="modalEdit" :loading="btnLoading">{{btnTxt}}</Button>
		</div>
	</Modal>
	<Modal v-model="modalDel" width="360">
		<p slot="header" style="color:#f60;text-align:center">
			<Icon type="information-circled"></Icon>
			<span>删除确认</span>
		</p>
		<div style="text-align:center">
			删除后讲无法恢复,是否删除？
		</div>
		<div slot="footer">
			<Button type="error" size="large" long :loading="delLoading" @click="del()">删除</Button>
		</div>
	</Modal>
</div>
</template>
<script>
import treeDropdown from '@/views/my-components/tree-dropdown/tree-dropdown'
import dictItem from '@/views/my-components/custom/dict-item'

import tools from '@/libs/tools.js'

export default {
	components: {
		dictItem,
		treeDropdown
	},
	data() {
		return {
			form: {
				id: '',
				teacherNo: '',
				teacherName: '',
				gender: '',
				campus: '',
				adviser: '',
				leaveDate: ''
			},
			queryForm: null,
			modalForm: {
				id: '',
				teacherNo: '',
				teacherName: '',
				gender: '',
				age: '',
				birthday: '',
				contactPhone: '',
				campus: '',
				remarks: '',
				adviser: '',
				leaveDate: ''
			},
			tmpForm: {},
			rules: {
				teacherNo: [{
					required: true,
					message: '工号为必填项',
					trigger: 'blur'
				}]
			},
			modal: false,
			modalDel: false,
			modalTitle: '新增单表',
			btnTxt: '新增',
			currPage: 1,
			infoId: '',
			pageSize: this.$store.state.app.pageSize,
			total: 0,
			loading: false,
			btnLoading: false,
			delLoading: false,
			tableData: [],
			tableColumns: [{
					title: '工号',
					key: 'teacherNo',
					render: (h, params) => {
						return h('a', {
							class: 'link',
							attrs: {
								id: params.row.id
							},
							on: {
								click: (e) => {
									this.modal = true;
									this.getDetail(e.target.id);
								}
							}
						}, params.row.teacherNo);
					}
				},
				{
					title: '教师姓名',
					key: 'teacherName',
					render: (h, params) => {
						return h('span', {
							'class': 'fn-text-overflow',
							attrs: {
								title: params.row.teacherName
							}
						}, params.row.teacherName);
					}
				},
				{
					title: '性别',
					key: 'genderLabel'
				},
				{
					title: '年龄',
					key: 'age',
					render: (h, params) => {
						return h('span', {
							'class': 'fn-text-overflow',
							attrs: {
								title: params.row.age
							}
						}, params.row.age);
					}
				},
				{
					title: '生日',
					key: 'birthday',
					render: (h, params) => {
						return h('span', {
							'class': 'fn-text-overflow',
							attrs: {
								title: params.row.birthday
							}
						}, params.row.birthday);
					}
				},
				{
					title: '联系电话',
					key: 'contactPhone',
					render: (h, params) => {
						return h('span', {
							'class': 'fn-text-overflow',
							attrs: {
								title: params.row.contactPhone
							}
						}, params.row.contactPhone);
					}
				},
				{
					title: '归属校区',
					key: 'campus',
					render: (h, params) => {
						return h('span', params.row.campus ? params.row.campus.name : '');
					}
				},
				{
					title: '修改时间',
					key: 'updateDate',
					render: (h, params) => {
						return h('span', {
							'class': 'fn-text-overflow',
							attrs: {
								title: params.row.updateDate
							}
						}, params.row.updateDate);
					}
				},
				{
					title: '删除标记',
					key: 'delFlagLabel'
				},
				{
					title: '归属顾问',
					key: 'adviser',
					render: (h, params) => {
						return h('span', params.row.adviser ? params.row.adviser.name : '');
					}
				},
				{
					title: '离校时间',
					key: 'leaveDate',
					render: (h, params) => {
						return h('span', {
							'class': 'fn-text-overflow',
							attrs: {
								title: params.row.leaveDate
							}
						}, params.row.leaveDate);
					}
				},
				{
					title: '操作',
					key: null,
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'info',
									size: 'small'
								},
								attrs: {
									id: params.row.id
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: (e) => {
										e.stopPropagation();
										e.preventDefault();
										this.modal = true;
										this.modalTitle = '编辑单表';
										this.btnTxt = '保存';
										this.getDetail(e.target.localName == 'span' ? e.target.parentNode.id : e.target.id);
									}
								}
							}, '修改'),
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								attrs: {
									id: params.row.id
								},
								on: {
									click: (e) => {
										e.stopPropagation();
										e.preventDefault();
										this.modalDel = true;
										this.infoId = e.target.localName == 'span' ? e.target.parentNode.id : e.target.id;
									}
								}
							}, '删除')
						]);
					}
				}
			]
		}
	},
	created() {
		console.log(123123);
		this.getDataList();
	},
	methods: {
		change(e) {
			console.log(e);
		},
		getDataList() {
			this.loading = true;
			let queryParam = Object.assign({
				currPage: this.currPage,
				pageSize: this.pageSize
			}, this.queryForm);
			this.API_qryList('/a/test/teacher/qryTeacherListByCon', queryParam, (d) => {
				console.log(d);
				this.tableData = d.page.list;
				this.total = d.page.count;
				setTimeout(() => {
					this.loading = false;
				}, 500);
			});
		},
		inDateChange(e) {
			console.log(e);
		},
		getDetail(id) {
			this.API_qryInfoById('/a/test/teacher/qryTeacherById', id, (d) => {
				d.campus = d.campus ? d.campus.id : null;
				d.adviser = d.adviser ? d.adviser.id : null;
				this.tmpForm = Object.assign({}, d);
				this.modalForm = Object.assign({}, this.tmpForm);
				console.log(this.modalForm);
			});
		},
		add(e) {
			console.log(e);
			this.modalTitle = '新增单表';
			this.btnTxt = '新增';
			this.modal = true;
		},
		del() {
			this.delLoading = true;
			console.log(this.infoId);
			this.API_delInfo('/a/test/teacher/deleteTeacher', this.infoId, (d) => {
				setTimeout(() => {
					this.modalDel = false;
					this.delLoading = false;
				}, 500);
				this.getDataList();
			});
		},
		changePage(page) {
			console.log(page);
			this.currPage = page;
			this.getDataList();
		},
		modalEdit() {
			delete this.modalForm['__ob__'];
			delete this.tmpForm['__ob__'];
			this.$refs.modalForm.validate((valid) => {
				if (valid) {
					if (tools.isEqual(this.modalForm, this.tmpForm)) {
						this.modal = false;
					} else {
						this.btnLoading = true;
						this.API_savaInfo('/a/test/teacher/saveTeacher', this.modalForm, (d) => {
							console.log(d);
							setTimeout(() => {
								this.$Message.success('保存成功!');
								this.btnLoading = false;
								this.modal = false;
								this.getDataList();
							}, 500);
						});
					}
				} else {
					this.$Message.error('请正确填写表单!');
					return false;
				}
			});
		},
		modalCancel() {

		},
		modalChange(visible) {
			if (visible) {

			} else {
				this.$refs.modalForm.resetFields();
			}
		},
		query(name) {
			console.log(this.form);
			this.queryForm = this.form;
			this.currPage = 1;
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.getDataList();
				} else {
					this.$Message.error('请正确填写表单!');
				}
			})
		}
	}
}
</script>
