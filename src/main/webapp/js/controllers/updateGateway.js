app.controller("Edit",["$scope","$http","$state",function($scope,$http,$state){
	var url = window.location.protocol+"//"+window.location.host +"/config/api" ;
	$scope.workgroup = {};
	$scope.gatewaytype={};
//获取数据下拉框的id
		$scope.initPage = function(){
			$http.get(url+"/workgroups")
			.success(function(data){
				console.log(data);
				$scope.workgroups = data;
				
				$http.get(url+"/gateway-types")
				.success(function(data){
					console.log(data);
					$scope.gatewaytypes = data;
				})
				.error(function(largeLoad,status,dx){
					alert(dx("X-configApp-error"));
				});
			})
			.error(function(largeLoad,status,dx){
				alert(dx("X-configApp-error"));
			});
		};
		$scope.initPage();
	
//clear清空数据事件
      $scope.Clear=function(){
		$scope.name="";
        $scope.id="";
        $scope.description="";
        $scope.gatewaytype=$scope.gatewaytype[0];
        $scope.workgroup=$scope.workgroup[0];
	};
	
//创建事件
	$scope.Ok=function(){
		var data=JSON.stringify({
            "name":$scope.name,
            "id":parseInt($scope.id),
            "description":$scope.description,
            //$scope.gateway.workgroupId = $scope.workgroup.id;
    		//$scope.gateway.gatewayTypeId = $scope.gatewaytype.id;
            "gatewayTypeId":$scope.gatewaytype.id,
            "workgroupId":$scope.workgroup.id,
            "status":"INIT"           
        })
       //console.log(data);
		$http({
            url:url+"/gateways",
            method: 'POST',            
            data: data      
        }).success(function(){
            console.log("success!");
            $scope.Clear();
        }).error(function(largeLoad,status,dx){
           alert(dx("X-configApp-error"));
            $scope.Clear();
        })
	}
	
}])