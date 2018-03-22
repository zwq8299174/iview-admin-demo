// TODO: ajax请求完成失败后回调方法

export default {
	data() {
		return {

		}
	},
	methods: {
		API_login(data,suc){
			this.post('demoserver/a/login', data).then((d) => {
				suc(d);
			});
		},
		API_logout(suc){
			this.post('demoserver/a/logout').then((d) => {
				suc(d);
			});
		},
		API_qryList(path,data,suc){
			this.post('demoserver'+path,data).then((d) => {
				suc(d);
			});
		},
		API_qryInfoById(path,id,suc){
			this.post('demoserver'+path,{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_savaInfo(path,data,suc){
			this.post('demoserver'+path,data).then((d) => {
				suc(d);
			});
		},
		API_delInfo(path,id,suc){
			this.post('demoserver'+path,{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_getDataList(data,suc){
			this.post('demoserver/a/test/testData/qryTestDataListByCon',data).then((d) => {
				suc(d);
			});
		},
		API_getDetail(id,suc){
			console.log(id);
			this.post('demoserver/a/test/testData/qryTestDataById',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_savaData(data,suc){
			this.post('demoserver/a/test/testData/saveTestData',data).then((d) => {
				suc(d);
			});
		},
		API_delData(id,suc){
			this.post('demoserver/a/test/testData/deleteTestData',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_treeData(data,suc){
			let param = {
				id:data.id
			};
			this.post('demoserver/a/sys/'+data.type+'/treeData',param).then((d) => {
				suc(d);
			});
		},
		API_treeDataAll(data,suc){
			let param = {
				id:data.id
			};
			this.post('demoserver/a/sys/'+data.type+'/treeDataAll',param).then((d) => {
				suc(d);
			});
		},
		API_selectData(type,suc){
			this.post('demoserver/a/sys/dict/getDictList',{
				type:type
			}).then((d) => {
				suc(d);
			});
		},
		API_qryDictTypeList(suc){
			this.post('demoserver/a/sys/dict/qryDictTypeList').then((d) => {
				suc(d);
			});
		},
		API_qryDictList(data,suc){
			this.post('demoserver/a/sys/dict/qryDictList',data).then((d) => {
				suc(d);
			});
		},
		API_saveDict(data,suc){
			this.post('demoserver/a/sys/dict/saveDict',data).then((d) => {
				suc(d);
			});
		},
		API_deleteDict(id,suc){
			this.post('demoserver/a/sys/dict/deleteDict',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_getDictById(id,suc){
			this.post('demoserver/a/sys/dict/getDictById',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_getMenuList(suc){
			this.post('demoserver/a/sys/menu/list',{}).then((d) => {
				suc(d);
			});
		},
		API_getMenuInfo(id,suc){
			this.post('demoserver/a/sys/menu/info',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_saveMenu(data,suc){
			this.post('demoserver/a/sys/menu/save',data).then((d) => {
				suc(d);
			});
		},
		API_deleteMenu(id,suc){
			this.post('demoserver/a/sys/menu/delete',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_getUserList(data,suc){
			this.post('demoserver/a/sys/user/qryUserList',data).then((d) => {
				suc(d);
			});
		},
		API_getUserById(id,suc){
			this.post('demoserver/a/sys/user/getUserById',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_deleteUser(id,suc){
			this.post('demoserver/a/sys/user/deleteUser',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_saveUser(data,suc){
			console.log(this.post);
			this.post('demoserver/a/sys/user/saveUser',data).then((d) => {
				suc(d);
			});
		},
		API_getRoleList(suc){
			this.post('demoserver/a/sys/role/list',{}).then((d) => {
				suc(d);
			});
		},
		API_getRoleInfo(id,suc){
			this.post('demoserver/a/sys/role/info',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_saveRole(data,suc){
			this.post('demoserver/a/sys/role/save',data).then((d) => {
				suc(d);
			});
		},
		API_deleteRole(id,suc){
			this.post('demoserver/a/sys/role/delete',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_getUserRole(suc){
			this.post('demoserver/a/sys/user/qryUserAllRoleList').then((d) => {
				suc(d);
			});
		},
		API_officeList(id,suc){
			this.post('demoserver/a/sys/office/list',{
				parentId:id
			}).then((d) => {
				suc(d);
			});
		},
		API_officeInfo(id,suc){
			this.post('demoserver/a/sys/office/info',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_officeSave(data,suc){
			this.post('demoserver/a/sys/office/save',data).then((d) => {
				suc(d);
			});
		},
		API_officeDelete(id,suc){
			this.post('demoserver/a/sys/office/delete',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_areaList(id,suc){
			this.post('demoserver/a/sys/area/list',{
				parentId:id
			}).then((d) => {
				suc(d);
			});
		},
		API_areaInfo(id,suc){
			this.post('demoserver/a/sys/area/info',{
				id:id
			}).then((d) => {
				suc(d);
			});
		},
		API_areaSave(data,suc){
			this.post('demoserver/a/sys/area/save',data).then((d) => {
				suc(d);
			});
		},
		API_areaDelete(id,suc){
			this.post('demoserver/a/sys/area/delete',{
				id:id
			}).then((d) => {
				suc(d);
			});
		}
	}
}
