webpackJsonp([9],{Fdun:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i("4YfN"),n=i.n(r),o=i("NbBB"),a=i("9rMa"),l={name:"Menu",components:{"menu-element":function(){return i.e(17).then(i.bind(null,"CreO"))}},data:function(){return{filterText:"",list:null,total:null,formEdit:!0,formAdd:!0,formStatus:"",typeOptions:[{name:"功能菜单",value:"menu"},{name:"外部链接",value:"dirt"}],listQuery:{name:void 0},treeData:[],defaultProps:{children:"children",label:"title"},labelPosition:"right",dialogFormVisible:!1,tagNodeName:"",form:{code:void 0,title:void 0,parentId:void 0,href:void 0,icon:void 0,orderNum:void 0,description:void 0,path:void 0,enabled:void 0,type:void 0,attr1:void 0},currentForm:null,currentId:"-1",menu_btn_add:!1,menu_btn_edit:!1,menu_btn_del:!1}},computed:n()({},Object(a.b)(["elements"]),{formTitle:function(){return this.currentForm?"update"===this.formStatus?'编辑"'+this.currentForm.title+'"菜单':"create"===this.formStatus?"-1"!==this.currentForm.parentId?'在"'+this.currentForm.title+'"菜单下新增':"在根节点下新增":'查看"'+this.currentForm.title+'"菜单':"在根节点下新增"}}),watch:{filterText:function(e){this.$refs.menuTree.filter(e)}},created:function(){this.getList(),this.menu_btn_add=this.elements.menu_btn_add,this.menu_btn_del=this.elements.menu_btn_delete,this.menu_btn_edit=this.elements.menu_btn_update},methods:{getList:function(){var e=this;Object(o.c)(this.listQuery).then(function(t){e.sortByOrder(t.data),t.data&&Array.isArray(t.data)&&t.data.length>0&&(e.recursiveChange(t.data,t.data[0].id),e.$refs.menuElement.menuId=t.data[0].id,e.$refs.menuElement.getList()),e.treeData=t.data})},changeSelect:function(e){this.treeData&&Array.isArray(this.treeData)&&this.recursiveChange(this.treeData,e)},recursiveChange:function(e,t){for(var i in e)e[i].id===t?e[i].isSelected=!0:e[i].isSelected=!1,e[i].children&&Array.isArray(e[i].children)&&e[i].children.length>0&&this.recursiveChange(e[i].children,t)},sortByOrder:function(e){if(e&&Array.isArray(e))for(var t in e.sort(function(e,t){return e.orderNum-t.orderNum}),e)e[t].children&&Array.isArray(e[t].children)&&e[t].children.length>0&&this.sortByOrder(e[t].children)},filterNode:function(e,t){return!e||-1!==t.label.indexOf(e)},getNodeData:function(e){this.currentId=e.id,this.currentForm=e,this.form=e,this.changeSelect(e.id),this.$refs.menuElement.menuId=e.id,this.$refs.menuElement.getList()},handlerEdit:function(e){this.currentForm=e,this.dialogFormVisible=!0,this.form=e,this.formEdit=!0,this.formStatus="update"},handlerAdd:function(e){e?(this.currentForm=e,this.currentId=e.id):this.currentId="-1",this.resetForm(),this.dialogFormVisible=!0,this.formEdit=!0,this.formStatus="create"},handlerView:function(e){this.currentForm=e,this.form=e,this.dialogFormVisible=!0,this.formEdit=!1,this.formStatus="view"},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.b)(e.id).then(function(){t.getList(),t.resetForm(),t.onCancel(),t.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3})})})},update:function(){var e=this;Object(o.d)(this.form.id,this.form).then(function(){e.getList(),e.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3}),e.dialogFormVisible=!1})},create:function(){var e=this;Object(o.a)(this.form).then(function(){e.getList(),e.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3}),e.dialogFormVisible=!1})},onCancel:function(){this.formEdit=!0,this.dialogFormVisible=!1,this.formStatus=""},resetForm:function(){this.form={code:void 0,title:void 0,parentId:this.currentId,href:void 0,icon:void 0,orderNum:void 0,description:void 0,path:void 0,enabled:void 0}}}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("el-container",[i("el-aside",{attrs:{width:"250px"}},[i("div",{staticClass:"left-content"},[i("el-input",{staticClass:"filter",attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),e.menu_btn_add?i("el-button",{staticClass:"add",staticStyle:{"margin-left":"10px"},attrs:{icon:"el-icon-plus",type:"text"},on:{click:function(t){e.handlerAdd(null)}}}):e._e(),e._v(" "),i("el-tree",{ref:"menuTree",staticClass:"filter-tree",attrs:{data:e.treeData,"filter-node-method":e.filterNode,props:e.defaultProps,"default-expand-all":"","node-key":"id"},on:{"node-click":e.getNodeData},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node,n=t.data;return i("span",{staticClass:"custom-tree-node"},[i("span",{class:{"common-font-color-success":n.isSelected}},[e._v(e._s(r.label))]),e._v(" "),i("span",[i("span",{staticClass:"el-icon-view",on:{click:function(t){t.stopPropagation(),e.handlerView(n)}}}),e._v(" "),e.menu_btn_add?i("span",{staticClass:"el-icon-plus",on:{click:function(t){t.stopPropagation(),e.handlerAdd(n)}}}):e._e(),e._v(" "),e.menu_btn_edit?i("span",{staticClass:"el-icon-edit-outline",on:{click:function(t){t.stopPropagation(),e.handlerEdit(n)}}}):e._e(),e._v(" "),e.menu_btn_del?i("span",{staticClass:"el-icon-delete",on:{click:function(t){t.stopPropagation(),e.handleDelete(n)}}}):e._e()])])}}])})],1)]),e._v(" "),i("el-container",[i("div",{staticClass:"right-content"},[i("menu-element",{ref:"menuElement",attrs:{"menu-id":e.currentId}})],1)])],1),e._v(" "),i("el-dialog",{attrs:{title:e.formTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"form",attrs:{"label-position":e.labelPosition,model:e.form,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"前端路由编码",prop:"code"}},[i("el-input",{attrs:{disabled:!e.formEdit,placeholder:"请输入前端路由编码"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"菜单标题",prop:"title"}},[i("el-input",{attrs:{disabled:!e.formEdit,placeholder:"请输入菜单标题"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"父菜单ID",prop:"parentId"}},[i("el-input",{attrs:{disabled:!e.formEdit,readonly:""},model:{value:e.form.parentId,callback:function(t){e.$set(e.form,"parentId",t)},expression:"form.parentId"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"图标",prop:"icon"}},[i("el-input",{attrs:{disabled:!e.formEdit,placeholder:"仅第二级菜单有效"},model:{value:e.form.icon,callback:function(t){e.$set(e.form,"icon",t)},expression:"form.icon"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"类型",prop:"type"}},[i("el-select",{staticClass:"filter-item",attrs:{disabled:!e.formEdit,placeholder:"请输入资源请求类型"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.typeOptions,function(e,t){return i("el-option",{key:t,attrs:{label:e.name,value:e.value}})}))],1),e._v(" "),"menu"!==e.form.type?i("el-form-item",{attrs:{label:"外部链接",prop:"href"}},[i("el-input",{attrs:{disabled:!e.formEdit,placeholder:"请输入资源路径"},model:{value:e.form.href,callback:function(t){e.$set(e.form,"href",t)},expression:"form.href"}})],1):i("el-form-item",{attrs:{label:"前端路由",prop:"path"}},[i("el-input",{attrs:{disabled:!e.formEdit,placeholder:"请输入路由地址"},model:{value:e.form.path,callback:function(t){e.$set(e.form,"path",t)},expression:"form.path"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"排序",prop:"orderNum"}},[i("el-input",{attrs:{disabled:!e.formEdit,placeholder:"请输入排序"},model:{value:e.form.orderNum,callback:function(t){e.$set(e.form,"orderNum",t)},expression:"form.orderNum"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"描述",prop:"description"}},[i("el-input",{attrs:{disabled:!e.formEdit,placeholder:"请输入描述"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1),e._v(" "),"update"==e.formStatus?i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("更新")]),e._v(" "),i("el-button",{on:{click:e.onCancel}},[e._v("取消")])],1):e._e(),e._v(" "),"create"==e.formStatus?i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.create}},[e._v("保存")]),e._v(" "),i("el-button",{on:{click:e.onCancel}},[e._v("取消")])],1):e._e()],1)],1)],1)},staticRenderFns:[]};var d=i("C7Lr")(l,s,!1,function(e){i("ORnM")},"data-v-6b83a535",null);t.default=d.exports},NbBB:function(e,t,i){"use strict";t.c=function(e){return Object(r.a)({url:"/api/admin/menu/tree",method:"get",params:e})},t.a=function(e){return Object(r.a)({url:"/api/admin/menu",method:"post",data:e})},t.b=function(e){return Object(r.a)({url:"/api/admin/menu/"+e,method:"delete"})},t.d=function(e,t){return Object(r.a)({url:"/api/admin/menu/"+e,method:"put",data:t})};var r=i("vLgD")},ORnM:function(e,t){}});
//# sourceMappingURL=9.5adbbe1bb7ea42f9d744.js.map