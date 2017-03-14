app.controller("Modify",["$state","$scope","$http","$stateParams",function($state,$scope,$http,$stateParams){
	var url = window.location.protocol+"//"+window.location.host +"/config/api" ;
	//路由传过来的ID、相关消息
	var modify_id=$stateParams.modify_id;     //获取id
	
	$scope.gateway = {};
	
	$scope.workgroups = [];
	$scope.gatewaytypes = [];
	
	$scope.workgroup = {};
	$scope.gatewaytype={};
	
	
	$scope.setWorkGroupById = function(id){
		var keepGoing = true;
		angular.forEach($scope.workgroups,function(data){
			if(keepGoing===true){
			 if(data.id===id){
				$scope.workgroup=data;
				//break;
				keepGoing=false;
			   }
			}
		})
	}
//		console.log($scope.workgroup);
//		for(var i=0; i<$scope.workgroups.length;i++){
//			var workgroupTmp = $scope.workgroups[i];
//			if(workgroupTmp.id == id){
//				$scope.workgroup = workgroupTmp;
//				break;
//			}
//		}
//	};

	
	$scope.setGateWayTypeById = function(id){
		var keepGoing = true;
		angular.forEach($scope.gatewaytypes,function(data){
			if(keepGoing===true){
			 if(data.id===id){
				$scope.gatewaytype=data;
				//break;
				keepGoing=false;
			   }
			}
		})
	}
//	$scope.setGateWayTypeById = function(id){
//		for(var i=0; i<$scope.gatewaytypes.length;i++){
//			var gatewaytypeTmp = $scope.gatewaytypes[i];
//			if(gatewaytypeTmp.id == id){
//				$scope.gatewaytype = gatewaytypeTmp;
//				break;
//			}
//		}
//	};
	
	
	
	$scope.getTheGateway = function(){
		$http.get(url+"/gateways/"+modify_id)
		.success(function(data){
			//默认选中传过来的值
			console.log(data);
			$scope.gateway = data;
			$scope.setWorkGroupById($scope.gateway.workgroupId);
			$scope.setGateWayTypeById($scope.gateway.gatewayTypeId);
//			console.log(data.gatewayTypeId);
		})
		.error(function(largeLoad,status,dx){
           alert(dx("X-configApp-error"));
        })
	};

//取下拉框中的所以信息以及调用	
	$scope.initPage = function(){
		$http.get(url+"/workgroups")
		.success(function(data){
//			console.log(data);
			$scope.workgroups = data;
			
			$http.get(url+"/gateway-types")
			.success(function(data){
//				console.log(data);
				$scope.gatewaytypes = data;
				
				$scope.getTheGateway();
			})
			.error(function(largeLoad,status,dx){
				alert(dx("X-configApp-error"));
			})
		})
		.error(function(largeLoad,status,dx){
           alert(dx("X-configApp-error"));
        })
	}
	
//确认修改按钮	
	$scope.OK = function(){		
		
		$scope.gateway.workgroupId = $scope.workgroup.id;
		$scope.gateway.gatewayTypeId = $scope.gatewaytype.id;
		
		$http({method:"put",
			url:url + "/gateways",
			contentType: "application/json",
			dataType:"JSON",
            data:JSON.stringify($scope.gateway),
            async: false})
	    .success(function(data){
	          alert("修改成功!")
	          $state.go("app.table.grid");
		})
	    .error(function(data,e,dx){
	        alert(dx("X-configApp-error"));
	        return;
	    });

	}

	
//取消修改按钮
	$scope.Clear=function(){
		$scope.getTheGateway();
	}
	$scope.initPage();
}])