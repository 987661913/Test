webpackJsonp([11],{SFKU:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i("4YfN"),a=i.n(o),n=i("vLgD");function s(t){return Object(n.a)({url:"/api/admin/dic/"+t,method:"delete"})}var r=i("9rMa"),l={name:"GroupDetail",components:{},props:{type:{type:String,default:"1"},typeCode:{type:String,default:null}},data:function(){return{filterText:"",list:null,total:null,formEdit:!0,formAdd:!0,formStatus:"",dialogUserVisible:!1,dialogUserName:"新增成员",dialogAuthorityVisible:!1,dialogAuthorityName:"关联菜单资源",listQuery:{groupType:this.type,name:void 0},treeData:[],defaultProps:{children:"childs",label:"name"},dialogRoleTitle:"新增节点",dialogRoleVisible:!1,labelPosition:"right",groupManager_btn_edit:!0,groupManager_btn_del:!0,groupManager_btn_add:!0,groupManager_btn_userManager:!0,groupManager_btn_resourceManager:!0,listDataId:"",form:{code:"",id:"",name:"",orderNum:0,parentCode:"",type:"",description:void 0},currentId:"1"}},computed:a()({},Object(r.b)(["elements"])),watch:{filterText:function(t){this.$refs.groupTree.filter(t)}},created:function(){this.getList()},methods:{checkDebug:function(t,e){},getList:function(){var t,e=this;(t=this.listQuery,Object(n.a)({url:"/api/admin/dic/tree",method:"get",params:t})).then(function(t){e.treeData=t.data})},filterNode:function(t,e){return!t||-1!==e.label.indexOf(t)},getNodeData:function(t){var e,i=this;(e=t.id,Object(n.a)({url:"/api/admin/dic/"+e,method:"get"})).then(function(t){i.form=t.data})},nodeEdit:function(t){this.listDataId=t.id,this.dialogRoleVisible=!0,this.dialogRoleTitle="编辑节点",this.getNodeData(t),this.formEdit=!1,this.formStatus="update"},nodeAdd:function(t){this.dialogRoleVisible=!0,this.dialogRoleTitle="新增节点",this.resetForm(t.id),this.formEdit=!1,this.formStatus="create"},nodeDelete:function(t){var e=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.node_type,s(t.id).then(function(){e.getList(),e.resetForm(),e.onCancel(),e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3})})})},update:function(){var t,e,i,o,a,s,r=this;(t=this.listDataId,e=this.form.code,i=this.form.description,o=this.form.name,a=this.form.orderNum,s="",Object(n.a)({url:"/api/admin/dic/"+t,method:"put",data:{id:t,code:e,description:i,name:o,orderNum:a,type:s}})).then(function(){r.getList(),r.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3}),r.dialogRoleVisible=!1})},create:function(){var t,e,i,o,a,s,r=this;(t=this.form.code,e=this.form.description,i=this.form.name,o=this.form.orderNum,a=1,s="",Object(n.a)({url:"/api/admin/dic/",method:"post",data:{code:t,description:e,name:i,orderNum:o,type:s,parentCode:a}})).then(function(t){r.getList(),r.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3}),r.dialogRoleVisible=!1})},onCancel:function(){this.formEdit=!0,this.dialogRoleVisible=!1,this.formStatus=""},resetForm:function(t){void 0===t&&(t="-1"),this.form={parentId:t,code:void 0,name:void 0,description:void 0,groupType:this.type}},userAdd:function(t){this.currentId=t.id,this.dialogUserVisible=!0},handlerAuthority:function(t){this.currentId=t.id,this.dialogAuthorityVisible=!0},closeUserDialog:function(){this.dialogUserVisible=!1},closeAuthorityDialog:function(){this.dialogAuthorityVisible=!1}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tab-item-contianer"},[i("el-input",{staticClass:"fileterInput",attrs:{placeholder:"输入关键字进行过滤",size:"medium"},model:{value:t.filterText,callback:function(e){t.filterText=e},expression:"filterText"}}),t._v(" "),i("el-row",[i("el-col",{staticStyle:{"margin-top":"15px"},attrs:{span:24}},[i("el-card",{staticClass:"card"},[i("span",{staticClass:"tree-title common-font-color-success"},[i("span",{staticStyle:{"padding-left":"30px"}},[t._v("名称")]),t._v(" "),i("span",{staticClass:"tree-operation"},[i("span",{staticClass:"data-authority"},[i("span",[t._v("数据权限")])]),t._v(" "),i("span",{staticClass:"menu-authority"},[i("span",[t._v("更新时间")])]),t._v(" "),i("span",{staticClass:"data-operate"},[i("span",[t._v("操作")]),t._v(" "),i("el-tooltip",{staticClass:"item",attrs:{"open-delay":1200,content:"在跟节点下新增",effect:"dark",placement:"top-start"}},[t.groupManager_btn_add?i("el-button",{attrs:{type:"text"},on:{click:function(e){return e.stopPropagation(),t.nodeAdd(e)}}},[i("span",{staticClass:"el-icon-plus common-font-color-success"})]):t._e()],1)],1)])]),t._v(" "),i("el-tree",{ref:"groupTree",attrs:{data:t.treeData,"filter-node-method":t.filterNode,props:t.defaultProps,"default-expand-all":"","highlight-current":""},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.node,a=e.data;return i("span",{staticClass:"custom-tree-node"},[i("span",[t._v(t._s(o.label))]),t._v(" "),i("span",{staticClass:"tree-operation"},[i("span",{staticClass:"data-authority"},[i("span",[t._v("数据权限")])]),t._v(" "),i("span",{staticClass:"menu-authority"},[i("span",[t._v("\n                  "+t._s(a.updTime||a.crtTime)+"\n                  ")])]),t._v(" "),i("span",{staticClass:"data-operate"},[i("el-tooltip",{staticClass:"item",attrs:{"open-delay":1200,content:"添加节点",effect:"dark",placement:"top-start"}},[i("el-button",{attrs:{type:"text"},on:{click:function(e){return e.stopPropagation(),t.checkDebug(e)}}},[i("el-dropdown",{attrs:{trigger:"click",type:"text"}},[i("span",{staticClass:"el-icon-plus common-font-color-success"}),t._v(" "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{nativeOn:{click:function(e){t.nodeAdd(a)}}},[t._v("新增节点")])],1)],1)],1)],1),t._v(" "),i("el-tooltip",{staticClass:"item",attrs:{"open-delay":1200,content:"编辑当前节点",effect:"dark",placement:"top-start"}},[i("el-button",{attrs:{type:"text"},on:{click:function(e){e.stopPropagation(),t.nodeEdit(a)}}},[i("span",{staticClass:"el-icon-edit common-font-color-waring"})])],1),t._v(" "),i("el-tooltip",{staticClass:"item",attrs:{"open-delay":1200,content:"删除当前",effect:"dark",placement:"top-start"}},[i("el-button",{attrs:{type:"text"},on:{click:function(e){e.stopPropagation(),t.nodeDelete(a)}}},[i("span",{staticClass:"el-icon-delete common-font-color-danger"})])],1)],1)])])}}])})],1)],1),t._v(" "),i("el-dialog",{attrs:{title:t.dialogRoleTitle,visible:t.dialogRoleVisible},on:{"update:visible":function(e){t.dialogRoleVisible=e}}},[i("el-form",{ref:"form",attrs:{"label-position":t.labelPosition,model:t.form,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"名称"}},[i("el-input",{attrs:{disabled:t.formEdit},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"编码"}},[i("el-input",{attrs:{disabled:t.formEdit},model:{value:t.form.code,callback:function(e){t.$set(t.form,"code",e)},expression:"form.code"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"描述"}},[i("el-input",{attrs:{disabled:t.formEdit},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),t._v(" "),"update"==t.formStatus?i("el-form-item",[t.groupManager_btn_edit?i("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("更新")]):t._e(),t._v(" "),i("el-button",{on:{click:t.onCancel}},[t._v("取消")])],1):t._e(),t._v(" "),"create"==t.formStatus?i("el-form-item",[t.groupManager_btn_add?i("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("保存")]):t._e(),t._v(" "),i("el-button",{on:{click:t.onCancel}},[t._v("取消")])],1):t._e()],1)],1)],1)],1)},staticRenderFns:[]};var c=i("C7Lr")(l,d,!1,function(t){i("f/Kc")},"data-v-6d904566",null);e.default=c.exports},"f/Kc":function(t,e){}});
//# sourceMappingURL=11.72bbf4e318d94479506c.js.map