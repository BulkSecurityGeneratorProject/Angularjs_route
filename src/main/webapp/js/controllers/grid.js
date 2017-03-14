app.controller('GridDemoCtrl', ['$scope', '$http','$state', function($scope, $http,$state) {
	
	var url = window.location.protocol+"//"+window.location.host +"/config/api" 
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [15, 30, 50],
        pageSize: 15,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
//        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = data;
//        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
//    	console.log("1111");
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get(url+"/gateways?page="+(page - 1)+"&size="+pageSize).success(function (largeLoad,status,dx) {
                	$scope.totalServerItems = dx("X-Total-Count");//返回记录的总数
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get(url+"/gateways?page="+(page - 1)+"&size="+pageSize).success(function (largeLoad,status,dx) {
                	$scope.totalServerItems = dx("X-Total-Count");
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
   
    

    
    //删除
    $scope.deleteIngridTenant = function(row){
        //alert(row.entity.allowance);
        var isTrue=confirm("确定删除吗？");
        if(isTrue===true){
        	console.log(row.entity.id);//返回当前记录的id
        	$http.delete(url+"/gateways/"+row.entity.id)
        	.success(function(){
        		console.log("success!");
        		$state.go("app.table.grid",{},{reload:true});
        	}) 
        	.error(function(largeLoad,status,dx){
        	 alert(dx("X-configApp-error"));
        })
        }
    };
    
    
    
    //修改
    $scope.updataIngridTenant = function(row){
    	$state.go('app.table.updateGateway',{modify_id:row.entity.id}) 
    }
    
    
    
    
    
    //style="padding:2px 14px;margin-left:0.1rem;margin-top:0.01rem"   style="padding:2px 14px;margin-left: 20px ;margin-top: 2px;"
    $scope.buttonCell_01 = '<button  class="btn btn-default bp" ng-click="deleteIngridTenant(row)" >删除</button>';
    //<a a ui-sref="app.table.updateGateway"></a>
    $scope.buttonCell_02 ='<button  class="btn btn-default bp" ng-click="updataIngridTenant(row)" >修改</button>';
    $scope.gridOptions = {
        showColumnMenu:true,
        i18n:'zh-cn',
        data: 'myData',
        enableSorting : true,//是否支持排序(列)
        enablePaging: true,
        showFooter: true,
        multiSelect: false,
        groups:["gate_name"],
        groupsCollapsedByDefault:false,
        selectedItems: $scope.mySelections,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs:[
            {field:"id",displayName:"网关ID",enableCellEdit:false},
            {field: "name",displayName:"网关名称",enableCellEdit: false},
            {field: "gatewayTypeId",displayName:"网关类型",enableCellEdit: false,visible:true},
            {field: "workgroupId",displayName:"所属群组",enableCellEdit: false,visible:true},
            {field: "description",displayName:"描述",enableCellEdit: false}, 
            {field: "status",displayName:"状态",enableCellEdit: false},
            {displayName:"删除",cellTemplate:$scope.buttonCell_01,enableCellEdit: false},
            {displayName:"修改",cellTemplate:$scope.buttonCell_02,enableCellEdit: false}
        ]
    };
}]);