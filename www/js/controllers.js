angular.module('starter.controllers', [])
.constant('webservice', {
	/*principal: 'http://localhost/ziksa_api/',*/
	principal: 'http://www.ziksa.biz/ziksa_api/',
	urls: {
		programs:'programs.php'
		,usersByID:'usersByID.php'
		,roles: 'getRoles.php'
		,updateUserByID: 'updateUserByID.php'
		,login: 'login.php'
		,signup: 'signup.php'
		,programByID: 'programByID.php'
		,saveImage: 'saveImage.php'
		,getEventsByUser: 'getEventsByUser.php'
		,saveUpdateNoteByCourse: 'saveUpdateNoteByCourse.php'
		,getNoteByNoteid:'getNoteByNoteid.php'
		,getNotesByCourseByUserid:'getNotesByCourseByUserid.php'
		,deletenotebyid: 'DeleteNoteByID.php'
		,getExamByCourseid: 'getExamByCourseid.php'
		,saveExamResult: 'saveExamResult.php'
		,getFeedback: 'getFeedback.php'
		,saveAttenance: 'saveAttenance.php'
		,saveFeedback: 'saveFeedback.php'
		,getUnitsByCourse: 'getUnitsByCourse.php'
		,getUnitsByCourseTrainer: 'getUnitsByCourseTrainer.php'
		,getContentsByCourse: 'getContentsByCourse.php'
		,confirmProgram:'confirmProgram.php'
		,getParticipants:'getParticipants.php'
		,saveAttenanceParticipant: 'saveAttenanceParticipant.php'
		,sendEmailParticipantsFeedback: 'sendEmailParticipantsFeedback.php'
		,saveURLFeedback: 'saveURLFeedback.php'
		},
	apis: {
		googlemaps:'googlemaps.php'
	}
	})
.controller('DashCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {})

.controller('myProgramsCtrl', function($window,$rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams, webservice) {
	
    $scope.selection = {
        togglecomplete:false,
        time: "4"
    };
	$scope.dueclass = "tab-item active";
	$scope.pastclass = "tab-item";
	
  $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.refreshdata = function(){
		$scope.show_loading();
        var link = webservice.principal + webservice.urls.programs;
        var start_date ='0000-00-00';
        var end_date ='0000-00-00';
        var today = new Date();
		//console.log($scope.userInfo.role);
    $http.post(link, {role_id : $scope.userInfo.role ,userid: $scope.userInfo.userid,is_completed : $scope.selection.togglecomplete,starttime:start_date,endtime:end_date}).then(function (res){
        $scope.hide_loading();
		$scope.selection.list = [];
		//console.log("is completed:" +$scope.selection.togglecomplete);
		//console.log(res);
		for(var i =0; i<res.data.length;i++){

			var list = {};
			var startdate = new Date(res.data[i].course_start_date);
			var months = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
			var enddate = new Date(res.data[i].course_end_date);
			var ctext=startdate.getDate()+" "+ months[startdate.getMonth()]+" "+startdate.getFullYear()+" - "+enddate.getDate()+" "+ months[enddate.getMonth()]+" "+enddate.getFullYear();
			list.courseid = res.data[i].courseid;
			list.batch_id = res.data[i].batch_id;
			list.venue = res.data[i].venue;
			list.course_name = res.data[i].course_name;
			list.preview_image = res.data[i].image;
			list.coursetext=ctext;
			
			$scope.selection.list.push(list);
		}
		//console.log(res.data[0].course_name);
		$scope.hide_loading();
    });
    };
    $scope.pushNotificationChange = function() {
		$scope.initialize();
    };
    $scope.initialize = function(){
	var db = $window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
			   //console.log("aaa");
			   //console.log(results.rows.item(0));
               	$scope.refreshdata();
			   
           }
        }, null);
     });
    };
    
	$scope.getDuePrograms = function(){
		$scope.dueclass = "tab-item active";
		$scope.pastclass = "tab-item";
		$scope.selection.togglecomplete = false;
		$scope.initialize();
	};
	$scope.getPastPrograms = function(){
		$scope.pastclass = "tab-item active";
		$scope.dueclass = "tab-item";
		$scope.selection.togglecomplete = true;
		$scope.initialize();
	};
	$scope.initialize();

})

.controller('controller_programs_employee', function($rootScope,$window, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
	
    $scope.selection = {
        togglecomplete:false,
        time: "4"
    };
	$scope.dueclass = "tab-item active";
	$scope.pastclass = "tab-item";
	
  $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.refreshdata = function(){
		$scope.show_loading();
        var link = webservice.principal + webservice.urls.programs;
        var start_date ='0000-00-00';
        var end_date ='0000-00-00';
        var today = new Date();
    $http.post(link, {role_id : $scope.userInfo.role ,userid: $scope.userInfo.userid,is_completed : $scope.selection.togglecomplete,starttime:start_date,endtime:end_date}).then(function (res){
        $scope.selection.list = [];
		//console.log("is completed:" +$scope.selection.togglecomplete);
		//console.log(res.data);
		for(var i =0; i<res.data.length;i++){

			var list = {};
			var startdate = new Date(res.data[i].course_start_date);
			var months = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
			var enddate = new Date(res.data[i].course_end_date);
			var ctext=startdate.getDate()+" "+ months[startdate.getMonth()]+" "+startdate.getFullYear()+" - "+enddate.getDate()+" "+ months[enddate.getMonth()]+" "+enddate.getFullYear();
			list.courseid = res.data[i].courseid;
			list.batch_id = res.data[i].batch_id;
			list.venue = res.data[i].venue;
			list.course_name = res.data[i].course_name;
			list.preview_image = res.data[i].image;
			list.coursetext=ctext;
			
			$scope.selection.list.push(list);
		}
		//console.log(res.data[0].course_name);
		$scope.hide_loading();
    });
    };
    $scope.pushNotificationChange = function() {
        $scope.refreshdata();
    };
    $scope.initialize = function(){
    
	var db = $window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               
               $scope.refreshdata();
			   
           }
        }, null);
     });
    };
    $scope.initialize();
	$scope.getDuePrograms = function(){
		$scope.dueclass = "tab-item active";
		$scope.pastclass = "tab-item";
		$scope.selection.togglecomplete = false;
		$scope.refreshdata();
	};
	$scope.getPastPrograms = function(){
		$scope.pastclass = "tab-item active";
		$scope.dueclass = "tab-item";
		$scope.selection.togglecomplete = true;
		$scope.refreshdata();
	};

})

.controller('controller_exams', function($q,$rootScope,$window, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaCalendar) {
	$scope.data={
		courseid:$stateParams.programID,
		userid:$stateParams.userid
	};
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
	$scope.list = [];
	
})
.controller('myCalendarCtrl', function($q,$rootScope,$window, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaCalendar) {
	$scope.eventssource = [];
	$scope.modeselected = {
		selector1class:'button button-stable button-block',
		selector2class:'button button-positive button-block',
		mode:'month'
	};
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){ $ionicLoading.hide(); };
	$scope.initialize = function(){
    $scope.show_loading();
	var db = $window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
			   $scope.hide_loading();
			   $scope.initializeCalendar();
           }
        }, null);
     });
    };
	$scope.initializeCalendar = function(){	
		//review the events
		var events = [];
		var date = new Date();
	    var link = webservice.principal+ webservice.urls.getEventsByUser;
		$http.post(link, {userid: $scope.userInfo.userid}).then(function (res){
			$scope.response = res.data;
			console.log(res);
			if(res.data.length > 0){
				for(var i=0;$scope.response.length > i;i++){
					var startDay = new Date($scope.response[i].time_start);
					var endDay = new Date($scope.response[i].time_end);
					events.push({
						title: $scope.response[i].title,
						startTime: startDay,
						endTime: endDay,
						allDay: false
					});
					
				}
				$scope.eventssource = events;
			}
		});
		
	};
	
	$scope.openMonthlyCalendar = function(){
		$scope.modeselected.selector1class = 'button button-stable button-block';
		$scope.modeselected.selector2class = 'button button-positive button-block';
		$scope.modeselected.mode = 'month';
	};
	$scope.openWeeklyCalendar = function(){
		$scope.modeselected.selector2class = 'button button-stable button-block';
		$scope.modeselected.selector1class = 'button button-positive button-block';
		$scope.modeselected.mode = 'week';

	};
	$scope.initialize();
		$scope.onEventSelected = function (event) {
		//console.log(event.title);
	};
	$scope.onViewTitleChanged = function (title) {
            $scope.viewTitle = title;
        };
	$scope.optionsGoogleCalendar = function(){
		$state.go("menu.optionsCalendar");
	};
})
.controller('myparticipants_trainerCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
	var trainer_userid = $stateParams.userid;
	var courseid = $stateParams.courseid;
	var batchid = $stateParams.batchid;
	$scope.participants = {};
	$scope.show_loading = function() {$ionicLoading.show({template: '<ion-spinner icon="android"></ion-spinner>'	});};
    $scope.hide_loading = function(){	$ionicLoading.hide();	};
	var link = webservice.principal+ webservice.urls.getParticipants;
	var link2 = webservice.principal+ webservice.urls.saveAttenanceParticipant; 
	$scope.show_loading();
	
	$http.post(link, {course_id: courseid,batch_id: batchid}).then(function (res){
		$scope.participants = res.data.participants;
		$scope.attendance = res.data.attendance;
		var c = new Date();
		var day = c.getDate();
		var month = c.getMonth()+1;
		var year = c.getFullYear();
		if(day<10){ day='0'+day; }
		if(month<10){ month='0'+month; } 
		var today = year+'-'+month+'-'+day;
	   for(var i = 0;i < $scope.participants.length;i++){
			for(var i2 = 0;i2 < $scope.attendance.length;i2++){
				//console.log($scope.participants[i].userid +' == '+ $scope.attendance[i2].userid +' && '+ today +' == '+ $scope.attendance[i2].datetime);
				if($scope.participants[i].userid == $scope.attendance[i2].userid && today == $scope.attendance[i2].datetime){
					$scope.participants[i].action = $scope.attendance[i2].action;
				}
			}
	   }
	   //console.log($scope.participants);
	   //console.log($scope.attendance);
	   $scope.hide_loading();
	});
	$scope.confirmDeclineParticipant = function(userid){
		var straction = "";
		for(var i = 0;i < $scope.participants.length;i++){
			if($scope.participants[i].userid == userid){
				straction = $scope.participants[i].action;
				console.log(straction);
			}
		}
		$http.post(link2, {userid: userid,course_id:courseid,action: straction,unitid:0,batch_id: batchid}).then(function (res){
			console.log(res);
		   $scope.hide_loading();
		});
	};
})
.controller('optionsCalendarCtrl', function($q,$rootScope,$window, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaCalendar) {
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };

$scope.addEventsToGoogle = function(){
	$scope.show_loading();
		var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
			   $scope.hide_loading();
				var link = webservice.principal+ webservice.urls.getEventsByUser;
			   
			   $http.post(link, {userid: $scope.userInfo.userid}).then(function (res){
					$scope.response = res.data;
					if(res.data.length > 0){
							
						var promises = $scope.response.map(function (item) {
								var found=0;
								var startDateFilter = new Date(item.time_start);
								var endDateFilter = new Date(item.time_end);
								startDateFilter.setMinutes(0);
								startDateFilter.setHours(0);
								startDateFilter.setSeconds(0);
								endDateFilter.setDate(endDateFilter.getDate()+1);
								endDateFilter.setMinutes(0);
								endDateFilter.setHours(0);
								endDateFilter.setSeconds(0);
								var startDate = new Date(item.time_start);
								var endDate = new Date(item.time_end);
								var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults 
									  calOptions.firstReminderMinutes = 60*24*7; // default is 60, pass in null for no reminder (alarm) 
									  calOptions.secondReminderMinutes = 60;
								window.plugins.calendar.createEventWithOptions(item.title, item.address_details, item.details, startDate, endDate,calOptions,function(){
									//alert("Done");
								},function(){
									//alert("Error");
								});
								return item;
						});

						$q.all(promises).then(function () {
							alert("All the events has been added to the calendar");
						});
								
					}
			   });
           }
        }, null);
		});		
};
$scope.openGoogleCalendar = function(){
	window.plugins.calendar.openCalendar(new Date(), function(){
		
	}, function(){
		
	});
};
//openCalendar();
})
.controller('myProfileSettingsCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
$scope.settings = {
    active:true,
    rating:0,
    corporate:true,
    password: "",
    confirm_password: ""
};
  var link_data = webservice.principal + webservice.urls.usersByID;
  var link_roles = webservice.principal + webservice.urls.roles;
  var link_save = webservice.principal + webservice.urls.updateUserByID;
  $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.show_loading();
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               $scope.hide_loading();
               $scope.getdata();
           }
        }, null);
     });
    $scope.getdata = function(){
		$scope.show_loading();
        $http.post(link_roles, {}).then(function (res){
            $scope.response = res.data;
            $scope.settings.roles = res.data;
        });
        $http.post(link_data, {userid: $scope.userInfo.userid}).then(function (res){
            $scope.response = res.data;
			$scope.settings.user = res.data[0];
            if($scope.settings.user.active == "1"){
                $scope.settings.active =true;
            }else{
                $scope.settings.active =false;
            }
            //$scope.settings.corporate
            $scope.settings.rating = $scope.settings.user.rating;
            
        });
		$scope.hide_loading();
    };
    $scope.save = function(){
        var vactive ="0";
        if($scope.settings.active == true){
            vactive ="1";
        }else{
            vactive ="0";
        }
        $http.post(link_save, {userid: $scope.userInfo.userid,rating: $scope.settings.rating,active: vactive}).then(function (res){
            $scope.response = res.data;
             var alertPopup = $ionicPopup.alert({
                 title: 'Changes Saved',
                 template: 'The changes have been saved successfully!'
               });
               alertPopup.then(function(res) { });
        });
    };
    $scope.changepassword = function(){
        if($scope.settings.password !="" && $scope.settings.confirm_password !="" && $scope.settings.password == $scope.settings.confirm_password){
        $http.post(link_save, { userid: $scope.userInfo.userid,password: $scope.settings.password }).then(function (res){
            $scope.response = res.data;
             var alertPopup = $ionicPopup.alert({
                 title: 'Password Saved',
                 template: 'The password has been changed successfully!'
               });
               alertPopup.then(function(res) { });
		});
        }else{
            if($scope.settings.password =="" || $scope.settings.confirm_password ==""){
             var alertPopup = $ionicPopup.alert({
                 title: 'Change Failed',
                 template: 'Please fill both fields'
               });
               alertPopup.then(function(res) {});
            }else if($scope.settings.password != $scope.settings.confirm_password){
             var alertPopup = $ionicPopup.alert({
                 title: "Change Failed",
                 template: "The passwords don't match!"
               });
            alertPopup.then(function(res) {});
            }
        }
    };
})
.controller('menuCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
  $scope.gotoPrograms = function(){
	var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
	db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               if($rootScope.userInfo.role == 1){
                    $state.transitionTo("menu.myPrograms", null, {'reload':true});
               }else if($rootScope.userInfo.role == 2) {
                    $state.transitionTo("menu.view_programs_employee", null, {'reload':true});
               }else if($rootScope.userInfo.role == 3) {
                    $state.transitionTo("menu.myPrograms2", null, {'reload':true});
               }
           }
        }, null);
     });
  };
  
})
.controller('loginCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $ionicPopup, $stateParams,webservice,$cordovaGeolocation) {
    $scope.loginData = {};
	var link_saveattendance = webservice.principal + webservice.urls.saveAttenance;
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    $scope.closeLogin = function() {};
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               if($rootScope.userInfo.role == 1){
                    $rootScope.reloadpage = true;
                    $state.transitionTo("menu.myPrograms", null, {'reload':true});
               }else if($rootScope.userInfo.role == 2) {
                    $rootScope.reloadpage = true;
                    $state.transitionTo("menu.view_programs_employee", null, {'reload':true});
               }else if($rootScope.userInfo.role == 3) {
                    $rootScope.reloadpage = true;
                    $state.transitionTo("menu.myPrograms2", null, {'reload':true});
               }
           }
        }, null);
     });
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.doLogin = function() {
        $scope.show_loading();
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE IF EXISTS LOGININFO;');
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGININFO(userid,name,role);');
        });
        var link = webservice.principal + webservice.urls.login;
        $http.post(link, {username : $scope.loginData.username,password : $scope.loginData.password}).then(function (res){
            $scope.hide_loading();
            $rootScope.userInfo = res.data;
			console.log(res);
            if($scope.userInfo.userid === undefined){
               var alertPopup = $ionicPopup.alert({
                 title: 'Login Failed',
                 template: 'The username or password is incorrect!'
               });
               alertPopup.then(function(res) {
               });
            }else{
				var onSuccess = function(position) {
					//alert('Latitude: '+ position.coords.latitude);
						 /* 'Longitude: '         + position.coords.longitude         + '\n' +
						  'Altitude: '          + position.coords.altitude          + '\n' +
						  'Accuracy: '          + position.coords.accuracy          + '\n' +
						  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
						  'Heading: '           + position.coords.heading           + '\n' +
						  'Speed: '             + position.coords.speed             + '\n' +
						  'Timestamp: '         + position.timestamp                + '\n');*/
						db.transaction(function (tx) {
						tx.executeSql('INSERT INTO LOGININFO(userid,name,role) VALUES(?,?,?)',[$scope.userInfo.userid +"", $scope.userInfo.name, $scope.userInfo.role_id]);
							var lat  = (position.coords.latitude).toString();
							var long = (position.coords.longitude).toString();
							$http.post(link_saveattendance, {userid: $scope.userInfo.userid, courseid: 0, action: 'login',location: lat+','+long, unitid:0,inarea:0,batch_id:0}).then(function (res){
								$scope.hide_loading();
								if($scope.userInfo.role_id == 1){
										$state.transitionTo("menu.myPrograms", null, {'reload':false});
								   }else if($scope.userInfo.role_id == 2) {
										$state.transitionTo("menu.view_programs_employee", null, {'reload':false});
								   }else if($scope.userInfo.role_id == 3) {
										$state.transitionTo("menu.myPrograms2", null, {'reload':false});
								   }
							});
						});  
				};

				// onError Callback receives a PositionError object
				//
				function onError(error) {
					alert('The application is unable to get your current location. Please be sure your location is enable and you have agreed to use Google Location Service');
				}

				navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
                
            }
        });  
    };
})
.controller('signupCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.registerdata = {};
    $scope.registerdata.roles = 0;
    var link = webservice.principal + webservice.urls.signup;
     $scope.doRegister = function() {
        if($scope.registerdata.roles != 0 
        && $scope.registerdata.name != "" 
        && $scope.registerdata.username != "" 
        && $scope.registerdata.password != ""
        && $scope.registerdata.roles != undefined 
        && $scope.registerdata.name != undefined 
        && $scope.registerdata.username != undefined 
        && $scope.registerdata.password != undefined
        ){
        $scope.show_loading();
        $http.post(link, {name : $scope.registerdata.name,username : $scope.registerdata.username,password : $scope.registerdata.password,role:$scope.registerdata.roles}).then(function (res){
            $scope.response = res.data;
            $rootScope.userInfo = res.data;
            $scope.hide_loading();
            if($scope.userInfo.done === undefined){
               var alertPopup = $ionicPopup.alert({
                 title: 'Registration Failed',
                 template: 'Something went wrong, please try again after some minutes'
               });
               alertPopup.then(function(res) {});
            }else{   
              var alertPopup = $ionicPopup.alert({
                 title: 'Registration Successfully',
                 template: 'Congratulations! Your user has been registered successfully'
               });
               alertPopup.then(function(res) {
                 $state.go("menu.login");
               });
            }
        });
     }else{
         
        var alertPopup = $ionicPopup.alert({
         title: 'Registration',
         template: 'Please fill all the fields'
        });
        alertPopup.then(function(res) {});
     }
     };
})
.controller('logoutCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaGeolocation) {
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.show_loading();
	var link_saveattendance = webservice.principal + webservice.urls.saveAttenance;
	var userid = 0;
    db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               userid = results.rows.item(0).userid;   
           }
		});
			var onSuccess = function(position) {
						db.transaction(function (tx) {
							tx.executeSql('DROP TABLE IF EXISTS LOGININFO;');
							var lat  = (position.coords.latitude).toString();
							var long = (position.coords.longitude).toString();
							$http.post(link_saveattendance, {userid: userid, courseid: 0, action: 'logout',location: lat+','+long, unitid:0,inarea:0,batch_id:0}).then(function (res){
								$scope.hide_loading();
								$state.go("menu.login");
							});
						});  
				};
				function onError(error) {
					alert('The application is unable to get your current location. Please be sure your location is enable and you have agreed to use Google Location Service');
					$scope.hide_loading();
					$state.go("menu.login");
				}
				navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
    });  
})
.controller('profileCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice, $cordovaCamera) {
  $scope.settings = {};
  $scope.settings.form = {};
  $scope.images = [];
  $scope.is_image_loaded = false;
  $scope.new_image = false;

  var link_data = webservice.principal + webservice.urls.usersByID;
  var link_roles = webservice.principal + webservice.urls.roles;
  var link_save = webservice.principal + webservice.urls.updateUserByID;
  $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.show_loading();
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               $scope.hide_loading();
               $scope.getdata();
           }
        }, null);
     });
    $scope.getdata = function(){
        $http.post(link_roles, {}).then(function (res){
            $scope.response = res.data;
            $scope.settings.roles = res.data;
        });
        $http.post(link_data, {userid: $scope.userInfo.userid}).then(function (res){
            $scope.response = res.data;
            $scope.settings.user = res.data[0];
			$scope.settings.details = res.data[1];
			$scope.settings.documents = res.data[2];
			$scope.settings.form.name = $scope.settings.user.name;
			$scope.settings.form.phone = $scope.settings.user.phone;
			$scope.settings.form.email = $scope.settings.user.email;
			$scope.settings.form.address = $scope.settings.user.address;
			if($scope.settings.details.length > 0){
			$scope.settings.form.pincode = $scope.settings.details.pincode;
			}
            $scope.settings.form.documentID = $scope.settings.documents.documentid;
			$scope.settings.form.documentType = $scope.settings.documents.documenttype;
			$scope.settings.form.documentImage64 = $scope.settings.documents.documentimage;
            $scope.settings.form.reference_name = $scope.settings.details.reference_name;
			$scope.settings.form.reference_relationship = $scope.settings.details.reference_relationship;
			$scope.settings.form.reference_phone = $scope.settings.details.reference_phone;
			$scope.settings.form.bank_userfullname = $scope.settings.details.bank_userfullname;
			$scope.settings.form.bank_name = $scope.settings.details.bank_name;
			$scope.settings.form.bank_accountnumber = $scope.settings.details.bank_accountnumber;
			$scope.settings.form.bank_ifsccode = $scope.settings.details.bank_ifsccode;
			
			if($scope.settings.form.documentImage64.length > 0){
				$scope.is_image_loaded = true;
				$scope.settings.form.documentImage = "data:image/jpeg;base64," + $scope.settings.form.documentImage64;
			}
			
			if($scope.settings.user.active == "1"){
                $scope.settings.active =true;
            }else{
                $scope.settings.active =false;
            }
            $scope.settings.rating = $scope.settings.user.rating;
        });
    };
	$scope.saveprofile = function(){
		if($scope.settings.form.name !="" 
		&& $scope.settings.form.phone != "" 
		&& $scope.settings.form.address != "" 
		&& $scope.settings.form.email != ""
		&& $scope.settings.form.pincode != ""
		&& $scope.settings.form.reference_name != ""
		&& $scope.settings.form.reference_relationship != ""
		&& $scope.settings.form.reference_phone != ""
		&& $scope.settings.form.bank_userfullname != ""
		&& $scope.settings.form.bank_name != ""
		&& $scope.settings.form.bank_accountnumber != ""
		&& $scope.settings.form.bank_ifsccode != ""){
			$scope.information = {};
			//REQUIRED
			angular.extend($scope.information,{userid: $scope.settings.user.userid});
			angular.extend($scope.information,{name: $scope.settings.form.name});
			angular.extend($scope.information,{phone: $scope.settings.form.phone});
			angular.extend($scope.information,{email: $scope.settings.form.email});
			angular.extend($scope.information,{address: $scope.settings.form.address});
			angular.extend($scope.information,{pincode: $scope.settings.form.pincode});
			angular.extend($scope.information,{reference_name: $scope.settings.form.reference_name});
			angular.extend($scope.information,{reference_relationship: $scope.settings.form.reference_relationship});
			angular.extend($scope.information,{reference_phone: $scope.settings.form.reference_phone});
			angular.extend($scope.information,{bank_userfullname: $scope.settings.form.bank_userfullname});
			angular.extend($scope.information,{bank_name: $scope.settings.form.bank_name});
			angular.extend($scope.information,{bank_accountnumber: $scope.settings.form.bank_accountnumber});
			angular.extend($scope.information,{bank_ifsccode: $scope.settings.form.bank_ifsccode});
			
			if($scope.settings.details.detailid !=""){
				angular.extend($scope.information,{detailid: $scope.settings.details.detailid});
			}else{
				angular.extend($scope.information,{detailid: 0 });
			}
			
			$http.post(link_save, $scope.information).then(function (res){
				$scope.response = res.data;
				
				 var alertPopup = $ionicPopup.alert({
					 title: 'Information Saved',
					 template: 'Thank you, the information has been saved'
				   });
				   alertPopup.then(function(res) { });
			});
			//$scope.settings.form.documentImage = "data:image/jpeg;base64," + "iVBORw0KGgoAAAANSUhEUgAAAGYAAABfCAYAAAAaqrIHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABjDSURBVHhe7V2Lc1xXfe4fESexHSdxGsiD2MGBEELDIwlloIRM67SlQxOGQlvaDtNpC2U606EZMnRSmGlJeWQoNJRHaGg69MEATiQ/sF6WZFu2di3Jj9iSLUurl2W9H3vv2V+/7/c7d7WSrrSr9d7VTsdn9e0592q1997vO7/HOfehX5HrpSbLdWFqtFwXpkZLbQiTy/HN2ija8uu04hr+5JzWUYmaOX7IPsi/0JcuA1y7BL6z8Hcr19VWqRGLichkE+Tn1zglfQlcXgLe8BP65eVtx5qv/O98ze9GWzemn7d1tVZqSJhQa7+oa/SlhEbk8hd+HT6vyyjOk6tL/nNL4KqCv1exbZni8Y/wG/5lTZUacWXKpzX8Aq1FezRf2Qlxk0clHPqhuN7nJDz7Z+LSvyvh8V8Td/TtEjbfKWHTVgnrbpKwfqcEh/dI2PiQhG1PiDv5aXGnnxXX9x1xY4fxXeP63dyefrd/1VqpEYsx96VujKKEM5Kb7xU3/GMJu56R4Mjtkm26SbKNN0MAkN+EuvFGbQdNW9DGOiCox7rXiJsleB3rXtuCmstbUWMdlsN9N0mu7UlxF1+S3FQ3hJrCJv32a6gkLoz2TO2QUSMigdbgXYzvs+zNru95CY+ixzffYsST9KYbIQAIJvkqBoWgMLaObV1Hi1FBCmrAse3hsEyBtK7bIdkDOyXs/pzk5vqwA9w32yet+c79050DqlgSFYYHZL3Rk68HyQP2bWfLbqxOXPenJGi9ywjeCFQ4g6u/GSIUh4l2o2Rfh0WpeBC4/g5x7XvFZX4iuYBWpDtv++vrapZkLYYHhJf+8MA81FLgrtzYzyU4+SGIQeuAmwG5AS3Bu6mSUI4wEEJd3T6KcwPE8ctesLD5veL6X5bcIuKRF4bHUM2SsDAED8wyKBiI1dMpCdO/JWHLrSAWvt+7pKzGC++2CslfD2UIQyGyqPOuTmPSjerewn2IRxSMAjU+IrnRX6ITzf9/E4YuwKwmZI3sKkBGFR5BFgVBGNDz8QEIENQpiisguyjKEQYiZDUpiJID7Es+SWCNTlKHmp+tv03Cjo9LbhYxqIqlosKo2bNr4UdbKoz+QtyVOglOPA43sX05sdeKMoQpBWZBrPHdECpo2CNu8FXEn2nf4bTyx0evYLG0UqXywuie+jZf4STGHl9EynsXSMRYo5DUSiAhYSzthjWr20MbaTbbrvvzSOUv27Fp8qIt1HbMlSoVFsZ2kj+Ey46KS+2Fe9qxisSKISmLUUHMckIgQJIQxaSw6TGMgU5b5+Mx+06oyU2FSmWF4Sva0Yk2CU9+GHEEGVcDDg4EZjeSbZWKBF0ZU2m2VRgKoiLhOODiwoaHkRgchBYL/pgJT0QFyjUKo1KgMhNRQWDebvoU4sn7QZa5Lh21a6aFA/IkVgxJuTIIwPhCy1Er0WVb73zS4A7vkdzwa3DXcyoMs07ysAy6buPlGoSJzNi2TIE4SnaTxzFyf+dy8pJEQsKUArWqQ/eIG29Bh8zmuTAx6N7yCxsuZQujonCjWvvlyXaklo+CJJ8KVwObKYyPOcGBe8WNmFujIFa0q6IuL+6UL4xajIFBz82dkzD1BAjabgNEElZAWmLYVIuhq8O2OTlKt3alCTosgh2KwU6rVJVVyndl2KiejOL2OXBM/SYE2YrBIXbYDxQ3NLVSLjZVGIKzBD4WtT0huekeEFJwbqnaFsOiFhMuijuN0Xzzzryl2EjeW01EYFLYRGEsEbDaEgS0Oz4mudle70n4U21XphvGZjPfl6D9/mRS4VKwicLEIajbJu7S90V4nseUKatcQ4zBa7YbPeR9es6kasF+JWpMGJ77Cep3IBmohzfBGMfztdFyDTEmhAv7E3Ett0EYjIrzZxerjFqzGCQCi0yjj31UHFxauaV8ixn4roTtuzSe5LOwiKxqosaE0Tk2H3NyF74psjjhGdtYKU0YukrapLpMxJXFAbiw9y4naBOQP13QuEVjXFDHqRMQwyyJvZbBOYa8JKHXG0RZWsNDmqVFA3GDcVislCTM8i+GMJdeQGp47yqiqg1Lzdn253D8xRg2VW/n9ePISxLcvsYZ7SBYPv2c5BZGPHckUxnl27qlZIthPq7fy4B/7F2rSNoMZDkX17gV1gKLad6CoIv1nJ5XYm6WRU1l4wlMDK9hn1DbiTfsT90OyY0165RNnsNKCaOjfH/hRNj3DxIeuSeWqGrDaQ0C2G6A9dBi9tFiOMlovTaWvARBi8ly29gHG9tg3974J7t+wL/4U6yUKAzfIE4wKWHnkyAigRNe5QBxJdt8u1ztfl4yl7ulp6tT+lufl9n996koJKjaFmOB36xFXSpFOvQWcVePg8Jo0Fkhi9GvQnocXv4XCVvviydpExAgxkx1/qkM96clkxmW7u4eOZlKy1jDJyVbt1PJiSOvmlCBaLkX/lly2asqSQkGU7owzs1J2PW0vxDP3Mdmw8FiRs7/VAYG+2VwcEi6uk9LJ4TpOtkkUwcfQo+tvitbBc3SwBfGNbnZi95iipcSgz8sZq5XsiceQxaEXrBZY5YVWGzdJcN9jZKBKAOZQenqgTDpFMRJyeShD6C3bo0nq4qgK9NJzv23ixtvU89TSinRYpBPXP66uNZ7LT1FFhRHVLWRbXmTjFxshCgZWI1ZTCp1St3Z1MHHNTOLI6uaoCvTWIc6d/YrSALGSjKZWGE031abY8PBjS1IcPLX4cawAVpL0hbD6R0OGHVGAeMRXY9grjUOGNvXKzbRvnL232RwoBdWk5FTiDEn0l1y7vgrMl//VpABV+ZhgZhpLH0+2kirw9e3WjtBATUZ4DYx+HXNj4lMn7sWYShKwUXfs+f0lgcKolMwSgo2mBSi70dt1wpQIBwk3ah+hldsoice2S0zqc/IUP8pWExGLSad6pDhpj+SuQNvRQKwXQIIYGMKwM8GMPbYMpMD1vGkVgoqDAU6tBvZ2QnLzoqUNVyZSRoJ464ckJD3oXhhlpGYAMxSvNWo29yGePJ2mTnxcbna848yemGfZAbOI+BnZDCD+II6gxhDi+mkK4PVMAlIdx6VM8f/Wy61fkVGGj4h0wfeBbFuVStRoiBONBCMI7QSUFE40GVHqLsFg80GEMvB5vplbYtRcSAKxi+uP5qCIWE4CO3FqwmtFFT8ZpCGgexMxzMycuEQRLikIgwinlxGaqxxhcteHK7rojCdCP5pxplTJlKqC0KlEXvSKlj3yQOwqD/GWGc3SNuuwiSZvakrY2bG7bADnPuySBZxpkhZQxgbCEESLkh4+g/hH28z4uhCEhaGglw9/VVYRQqxYwDEUwiKsgKDw5om02IY/HUcA1E6aTGsfSJAsE0r0t+hfaqzTS60f03m9j8AApPN3nixIGcCNDtr+aC4mTc802uXeFdGYaCMuTIn4cnfAGFQP4bEDQPCmoui9SEYa40dZo1R/GT6CzJ06SSIHlSyKYoK49tDw6NyZXxcJiYnZWZmRubm5oAFGb86KT2nz0oKxBeDCsa0Gkh3HoGr+xIE2g3yLBmwGBTFJhuH0PXFkV4M+fiCtlpNPdLmyZTxvE6Jtxh92a0Tufk+BP5H4kkuA0vXBfiU2ws0d+zDMnSxCeQPqAgR6LpGRkZkEkIsLBRe9ZiThcUFXT80ZOJpuhwjxEqoKGpBZlGsezrqZPzwR2WR93CqOADjwj7OuyEzLFcYfJfGMv1Omz/LjR4GyYFnO76sGWMUfF3Zj8D/4CqCy0WuATurFsJlHHDjNpnoek4yl89CCLikgWEdMHKKZXh4RObn55Gu++wwEgQCjY6Oqhvj5yJr6u45EyvESnQy7qgoKYh0UuMPxUmlu2Wg5W9kof5uFUYvheWtGXqDE0gtQxz7G4gLcXQWoA7LQz9DnOA1aGuXtYVRNxaKG/4vCdv3rCK4fGAnWdONNf8qxiEvYRxyXmOIkgwLyQwPy+zsrAqS3x8gCAK4rAnJDI0ss6pImFItJuUTAhUD6ESbsekE16U75fzRf4Vru9+7IVoNhcE+xxBfDPyO/C2F+C66RzfwnyLhnB7bWmUdi7HA7zLflaB9VwzBxZEf88A6oos1okHi4pFdMvbGq7AOZFskFoH88lBG48fiYsHlpihsz87Ny/AIrAQCLIP+7caEoRBmIVGbtU8aVCgMUo/9h0zvfycI5c1MRm55FuNji7oxL/DlH0GYGX908WWN4E9hWOPn8reRKpc5o6wuiwGebfSaBvQWitRyJ0R5GSnuRRDKdJckD8k4RKFVFBZazfT09DIrKRSGVha1S7aYEsDU+uzxV2XmIMWBIMQK0kuBxRjwoKJQ3Jsl1/9DEd4AtU6JFyZfnAQXviBh65vjiS8GFYSg28JOqvXcAPf1PaTCF0GyEUqyJyen8q6LJXJfExN0XUtxJBInWk5KGI07sKLe9m/IXP1byrIWQv+OwqjV3IB1iLO9L2Iss/5FGmsIYxZDYtyFZyHMm+KJLwK6Mh3zRClx01aZ7H5WT2oxlug4BJZyFeQHoc8CuWHuAeqpqallosQhKWGi+MME4VLrc5oQxBFfDFGc0pttAbYdhQnKEMbIsd4b8hEhR8oThjMFPGei4xYsMyUe7jvqB4sUZlBGRsdkMWsxJRKFhZkXxyxKeoEwK0VKTBhNCBh/OLXTJpOHPgiSt8eSvy6i6RgdD5lIZQujsSXC4Et6/Vg88cVhF5jTle2Ukd56EBvFFAwWh4YQ6Hl1fNQZrA6CEIF+bJnLWguJubJlSEsXBqLTh96tBGc1ITDCY8UogA5UeTeAiuLT5v6Xywv+eVEAN/g9ZGW7Y0kvCgZ6zhignuz6O7iwniWiUTN+hHBhtk2zGGJiYnLNYL8SyQmT9mCbbi0lmeY/h0u7Q0m20wbxYhQiCv4KujXUrv/fyxSGYxh9oT36UwwwH4gnvgg4yldrablXRnsPqOsigSSbg8dsgQuLQBfGtLhQlPXEqY7FGGg1U4ceV2vR6ZoSEgKKF01iRnUu85NyxzE2R6bzZBPNEhx7KJb4ovAZ2UTXl7y12GQjZ4RpFbSWSBDbbk4HkCQ5EmY9UYhquTId3wADzZ+Xhbq7JMsHCpXiyhQ2sGQCEOzbgkH7L65h5K+uDOLM90p4HL41jvgioMUsttwtoxdeV2vRTIwkQhhOPhYKQjBdHkUyUCjK5gkTuTFrR8Kc6fgfmdn/gMWNkiwGXKgL26LiqCvTczJlzJWpD4tcGa3GX0tmo3Y/pVICKMzs8Sdl+FK7xhSCRA+PwI1hIBkJYlsTmZmd1ekYy9qWCxALTSSY3Vnd3ZOcK+OY5gTiDC/0GP/lU7Ca7UZyjBiFKAz6Gmf23ym5qbQe83pljRhjL53+R+XOfkbCljsk0EEivpyIEWI1bpTxM9/Ss42cmLRzKAz65sYKCwUaGxvT32fwOVpCMag1AWZVQ/kzmElAZ6EpENq97S/K7IH7SrIYpsvRAFPjUvteyc0Uvz1jTYuJerNd6PcNDDLvUUHUakoUhinyUN9hWACDvvXqJfdU6KoigvkZa8dayArk/9Yv05WtJLSi6ORUTaf0dNTL9P6HNQmIFaMAKp4XRqd1LryAUf9VT/TaZY0YwzcDxXHjh5GZvUPJzp+PXyFCHOaPPgo31oreHRFIt4M6TyjB3m9Woi5JsQGLKRC8u/tMPKGVAiyGM9ApZGeTB98Hsouf+YxSZXVnvNNM72xeP76wrO3KVBRdsJNlHe+22LKeK/NTL2zrdEzzDllo3QW8VRZb90iWdduePLieyOJ3i/oZA5dLgX6+jZ8Hjjwg8wfv1+n6ZLDbUM/6PrilW4x0Bncl3upVwmjgp0AAbzmfTIHXpTnBtUq8K1tZoLBL7wXh25bmvgoF8aCbC5pvAUm7jLQjIC9pqED3q1AqTH0VQcHqdoF4XtRho/s4YbJ6FhQctX8E8eU8CGWPX7+UJAyfkeIGXpKg7T5YAgZXa7kyWMvY2R/I0MA5BPx+GRzguZa+hHFR64HBXunp7pR0+njVkGKd6pCzx1+BSG+z4A4BVgpjloX2ha/mLywvVkqzGLq2hUEJeTWmTrHEW8xsx1OIKcdlYMjHjxJjRbnQZAGIYk3SI/+V6Ex1a+xJd3bKlcNPQRjEkAJR8sLsw4j/wJvFTZwAkxy4V8hiNDsLFyTs/qRkW27Lx5GVmEr9pQz1d4G0wiC/OpuqHLwwmkTwgr+Es7KVwNiGM9AnkEqPNH5CsnW3xQtDnHhGcnOXNL5UVBj6s1zmxxIi2K71zMo5tZhjRlrionhgOwODI2hHt2HEEJgQ7EJC1J0dsJi9sBh/lSdG+ayjc/2ML67v2yLBJNn0WL+UbjGs3aKE6d+GCPHPtQyat+sVL0P954ywgvFLErjsv/8yRNHbMCAML6qoHjhVk5L+1ucQY+7xmZlNVDq95RCoAy8ND4qbOgUGmY1VUBh+D02QzyMLL30NSUD8Hcs6mwxrsrEO18GUYz5XMeg2GO8Y97Ddek4qMvhWBwzqUTa2BI7wsS9MBLhMl9b3HQR9sxYmUtbN1y8lBn8TBm/idExjzyRbTRR2SmsjSu+j0Top+H1o8G1es7XCxycJjk/s3hcTwdoArEXHLWgHB+7wNyzxFIdxWIIuJboy/SYELbxCWs7Qy8jJ748RZovkPFl6gqwKFsNxlVkpRKmvrjC8hYMWw6sso1R56dnNnE3G/vR+S3LBVRVDMzKjtGgpMcbou4mNt9ziiAS0Gj2XTyvBjiQtwlqg5fh2rTyyxOmzBuAtmh+VHG9UKqOU6MpoK6qKKq4p39g+CY49aMT4nruMsGqhxoRhFmZPm90mrv9HsJb1TyGvVTYQ/PlmObiJBOd27rMSHrk9f7XlMsKqhVoTxgd+/kOh3NwA+3JZZUPCEK4ggOWyoxg4fQCkbFsiqtqoOWHg2ut3IuAfQT8OlKdySonCmJXoNlQTa+utGqM/QyLwNhBkQZgE6e151bKiTRZGxypwX9ENuK7+VgzE/1cknAU/8DDFJ5JjS4kxZnVRYdSCshL2/b0ErXeDHOwoBdFEgIlBAYFJYROF0TSZYnhReAF62PU5yc1nvIchR+Upc03CaOHGdUbgKWQhfBoSEgHedq5kVSFT22RhONDk+Xy9kK/jaX36Be/3Vn7yJG28XLPFaE0sIt50/Z6ELTsw4DOLWUZgUthMV8YBJLOwfeiQTI05e6xPLOeFJkyUSh+3rCxlC6MZGvoGto7aXm72jP4npaw+bwYDrUICk8ImCqMxhdbS+DCCfauKolMuETg3VqYy5QsTU1SeuV5kau8Xp8IwCdiig1BeXK5zaIWkVgLVEobW4d2WTrWg1imYhndIbuoMhPBqVKhUWBjuG3pJcFVCPrkclsMbl+jWNO4UkFgxVFEYmw9jwLdTxUHTI+a+wuXXyFWiVFYY7TTMQpy4uTck7P4DCfTEGg5GLWaJxIqhSsIw+7I5MFoK6qO/I7mrJ8RpTPED79q1mKUd1J2F5eTO/ZXdXwMC7UrOCqNawnj3xceOuJOf0uwLR7l0vP7YK1UqKozNQLP4i8XR0gxl8Ad65lMfnF3pOFNNi4EwfFJf/oI9PUA2ouOuXKmwMMuLCcNBKFzb7Glxp/ZqOm1JAF0bDprnUnTZBqdctkHqEuHrogLC8GQWz63YKB7b1ngSieFPhLW8R3Jjjci85nFcZiVelURKssJgvwvdmwtnJOz/uoTtD4B85P4NPGVAIZYI1n9S6okuCRURBmJo/MC+vI79YrZFMTh1f+hecWe+KLmF4fxxREhQl2SFwd5b78o/2YLrYPjzl8Sd+wsJW/kvGEHMsjsINphWV0AYHY9QDB/cNcDrPyb9fbty0v+bq+g/4LKzmftKTpmEheGPf1EQPTi7dgDmg8ztvARdTyNzu1XFoDgmEMVaInxdVEQYy7QWX/P/d7n9SXETR5EGL3pB2MfsOLigtT6HGnVCJVlhWLjvyw7KDlJ/wQpvbrZLXN+XQQgfjcL5Nro4Dk4LBQCBUZsWxd8Bug61nsrOP0KecQFtdUlcB9F0PV2VjyX5Nmp+5uA9kuv5W6TAFMT/b2XdRb5ZnMwve/A9qZK8MCUU6qTuLpwWN/SKhF0f02sKgmab1uHZUYtFJpZdP71F1+kYCSLas/15RzGFgEgKCKCBnNd32TLBu8E0w4IYru0JCfte9DPCyCB9TNzsUhvCRC8dqEX3ZcLlTbZJ+MZfI9WGJTXT3YHcAisxy6FoEIDr6yCaCkFrwO9gEdrWjAvt+lsle+AOCTkO4X8dD2b9tmz7+oO2utpNLjViMUvEwHRUFP1fAiHA1Q4ELgxIOI2R9tjPxfV/EwPXz0rY+RFx/MfarXdDrG32bP+DdyFmvQfrPiSu89Pizr8AK/wFXNQxDAp79W5h6wD87oKam1bQZbG1uaV2hCHyqXW0jsuep4L11ubK5Z/zb1brei6ZBdgqLnFdtB2Colibv1Foe3NLTQhzvawu14Wp0XJdmJosIv8HVk+3kr2QtxUAAAAASUVORK5CYII=";
			//$scope.settings.form.documentImage64 = "iVBORw0KGgoAAAANSUhEUgAAAGYAAABfCAYAAAAaqrIHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABjDSURBVHhe7V2Lc1xXfe4fESexHSdxGsiD2MGBEELDIwlloIRM67SlQxOGQlvaDtNpC2U606EZMnRSmGlJeWQoNJRHaGg69MEATiQ/sF6WZFu2di3Jj9iSLUurl2W9H3vv2V+/7/c7d7WSrrSr9d7VTsdn9e0592q1997vO7/HOfehX5HrpSbLdWFqtFwXpkZLbQiTy/HN2ija8uu04hr+5JzWUYmaOX7IPsi/0JcuA1y7BL6z8Hcr19VWqRGLichkE+Tn1zglfQlcXgLe8BP65eVtx5qv/O98ze9GWzemn7d1tVZqSJhQa7+oa/SlhEbk8hd+HT6vyyjOk6tL/nNL4KqCv1exbZni8Y/wG/5lTZUacWXKpzX8Aq1FezRf2Qlxk0clHPqhuN7nJDz7Z+LSvyvh8V8Td/TtEjbfKWHTVgnrbpKwfqcEh/dI2PiQhG1PiDv5aXGnnxXX9x1xY4fxXeP63dyefrd/1VqpEYsx96VujKKEM5Kb7xU3/GMJu56R4Mjtkm26SbKNN0MAkN+EuvFGbQdNW9DGOiCox7rXiJsleB3rXtuCmstbUWMdlsN9N0mu7UlxF1+S3FQ3hJrCJv32a6gkLoz2TO2QUSMigdbgXYzvs+zNru95CY+ixzffYsST9KYbIQAIJvkqBoWgMLaObV1Hi1FBCmrAse3hsEyBtK7bIdkDOyXs/pzk5vqwA9w32yet+c79050DqlgSFYYHZL3Rk68HyQP2bWfLbqxOXPenJGi9ywjeCFQ4g6u/GSIUh4l2o2Rfh0WpeBC4/g5x7XvFZX4iuYBWpDtv++vrapZkLYYHhJf+8MA81FLgrtzYzyU4+SGIQeuAmwG5AS3Bu6mSUI4wEEJd3T6KcwPE8ctesLD5veL6X5bcIuKRF4bHUM2SsDAED8wyKBiI1dMpCdO/JWHLrSAWvt+7pKzGC++2CslfD2UIQyGyqPOuTmPSjerewn2IRxSMAjU+IrnRX6ITzf9/E4YuwKwmZI3sKkBGFR5BFgVBGNDz8QEIENQpiisguyjKEQYiZDUpiJID7Es+SWCNTlKHmp+tv03Cjo9LbhYxqIqlosKo2bNr4UdbKoz+QtyVOglOPA43sX05sdeKMoQpBWZBrPHdECpo2CNu8FXEn2nf4bTyx0evYLG0UqXywuie+jZf4STGHl9EynsXSMRYo5DUSiAhYSzthjWr20MbaTbbrvvzSOUv27Fp8qIt1HbMlSoVFsZ2kj+Ey46KS+2Fe9qxisSKISmLUUHMckIgQJIQxaSw6TGMgU5b5+Mx+06oyU2FSmWF4Sva0Yk2CU9+GHEEGVcDDg4EZjeSbZWKBF0ZU2m2VRgKoiLhOODiwoaHkRgchBYL/pgJT0QFyjUKo1KgMhNRQWDebvoU4sn7QZa5Lh21a6aFA/IkVgxJuTIIwPhCy1Er0WVb73zS4A7vkdzwa3DXcyoMs07ysAy6buPlGoSJzNi2TIE4SnaTxzFyf+dy8pJEQsKUArWqQ/eIG29Bh8zmuTAx6N7yCxsuZQujonCjWvvlyXaklo+CJJ8KVwObKYyPOcGBe8WNmFujIFa0q6IuL+6UL4xajIFBz82dkzD1BAjabgNEElZAWmLYVIuhq8O2OTlKt3alCTosgh2KwU6rVJVVyndl2KiejOL2OXBM/SYE2YrBIXbYDxQ3NLVSLjZVGIKzBD4WtT0huekeEFJwbqnaFsOiFhMuijuN0Xzzzryl2EjeW01EYFLYRGEsEbDaEgS0Oz4mudle70n4U21XphvGZjPfl6D9/mRS4VKwicLEIajbJu7S90V4nseUKatcQ4zBa7YbPeR9es6kasF+JWpMGJ77Cep3IBmohzfBGMfztdFyDTEmhAv7E3Ett0EYjIrzZxerjFqzGCQCi0yjj31UHFxauaV8ixn4roTtuzSe5LOwiKxqosaE0Tk2H3NyF74psjjhGdtYKU0YukrapLpMxJXFAbiw9y4naBOQP13QuEVjXFDHqRMQwyyJvZbBOYa8JKHXG0RZWsNDmqVFA3GDcVislCTM8i+GMJdeQGp47yqiqg1Lzdn253D8xRg2VW/n9ePISxLcvsYZ7SBYPv2c5BZGPHckUxnl27qlZIthPq7fy4B/7F2rSNoMZDkX17gV1gKLad6CoIv1nJ5XYm6WRU1l4wlMDK9hn1DbiTfsT90OyY0165RNnsNKCaOjfH/hRNj3DxIeuSeWqGrDaQ0C2G6A9dBi9tFiOMlovTaWvARBi8ly29gHG9tg3974J7t+wL/4U6yUKAzfIE4wKWHnkyAigRNe5QBxJdt8u1ztfl4yl7ulp6tT+lufl9n996koJKjaFmOB36xFXSpFOvQWcVePg8Jo0Fkhi9GvQnocXv4XCVvviydpExAgxkx1/qkM96clkxmW7u4eOZlKy1jDJyVbt1PJiSOvmlCBaLkX/lly2asqSQkGU7owzs1J2PW0vxDP3Mdmw8FiRs7/VAYG+2VwcEi6uk9LJ4TpOtkkUwcfQo+tvitbBc3SwBfGNbnZi95iipcSgz8sZq5XsiceQxaEXrBZY5YVWGzdJcN9jZKBKAOZQenqgTDpFMRJyeShD6C3bo0nq4qgK9NJzv23ixtvU89TSinRYpBPXP66uNZ7LT1FFhRHVLWRbXmTjFxshCgZWI1ZTCp1St3Z1MHHNTOLI6uaoCvTWIc6d/YrSALGSjKZWGE031abY8PBjS1IcPLX4cawAVpL0hbD6R0OGHVGAeMRXY9grjUOGNvXKzbRvnL232RwoBdWk5FTiDEn0l1y7vgrMl//VpABV+ZhgZhpLH0+2kirw9e3WjtBATUZ4DYx+HXNj4lMn7sWYShKwUXfs+f0lgcKolMwSgo2mBSi70dt1wpQIBwk3ah+hldsoice2S0zqc/IUP8pWExGLSad6pDhpj+SuQNvRQKwXQIIYGMKwM8GMPbYMpMD1vGkVgoqDAU6tBvZ2QnLzoqUNVyZSRoJ464ckJD3oXhhlpGYAMxSvNWo29yGePJ2mTnxcbna848yemGfZAbOI+BnZDCD+II6gxhDi+mkK4PVMAlIdx6VM8f/Wy61fkVGGj4h0wfeBbFuVStRoiBONBCMI7QSUFE40GVHqLsFg80GEMvB5vplbYtRcSAKxi+uP5qCIWE4CO3FqwmtFFT8ZpCGgexMxzMycuEQRLikIgwinlxGaqxxhcteHK7rojCdCP5pxplTJlKqC0KlEXvSKlj3yQOwqD/GWGc3SNuuwiSZvakrY2bG7bADnPuySBZxpkhZQxgbCEESLkh4+g/hH28z4uhCEhaGglw9/VVYRQqxYwDEUwiKsgKDw5om02IY/HUcA1E6aTGsfSJAsE0r0t+hfaqzTS60f03m9j8AApPN3nixIGcCNDtr+aC4mTc802uXeFdGYaCMuTIn4cnfAGFQP4bEDQPCmoui9SEYa40dZo1R/GT6CzJ06SSIHlSyKYoK49tDw6NyZXxcJiYnZWZmRubm5oAFGb86KT2nz0oKxBeDCsa0Gkh3HoGr+xIE2g3yLBmwGBTFJhuH0PXFkV4M+fiCtlpNPdLmyZTxvE6Jtxh92a0Tufk+BP5H4kkuA0vXBfiU2ws0d+zDMnSxCeQPqAgR6LpGRkZkEkIsLBRe9ZiThcUFXT80ZOJpuhwjxEqoKGpBZlGsezrqZPzwR2WR93CqOADjwj7OuyEzLFcYfJfGMv1Omz/LjR4GyYFnO76sGWMUfF3Zj8D/4CqCy0WuATurFsJlHHDjNpnoek4yl89CCLikgWEdMHKKZXh4RObn55Gu++wwEgQCjY6Oqhvj5yJr6u45EyvESnQy7qgoKYh0UuMPxUmlu2Wg5W9kof5uFUYvheWtGXqDE0gtQxz7G4gLcXQWoA7LQz9DnOA1aGuXtYVRNxaKG/4vCdv3rCK4fGAnWdONNf8qxiEvYRxyXmOIkgwLyQwPy+zsrAqS3x8gCAK4rAnJDI0ss6pImFItJuUTAhUD6ESbsekE16U75fzRf4Vru9+7IVoNhcE+xxBfDPyO/C2F+C66RzfwnyLhnB7bWmUdi7HA7zLflaB9VwzBxZEf88A6oos1okHi4pFdMvbGq7AOZFskFoH88lBG48fiYsHlpihsz87Ny/AIrAQCLIP+7caEoRBmIVGbtU8aVCgMUo/9h0zvfycI5c1MRm55FuNji7oxL/DlH0GYGX908WWN4E9hWOPn8reRKpc5o6wuiwGebfSaBvQWitRyJ0R5GSnuRRDKdJckD8k4RKFVFBZazfT09DIrKRSGVha1S7aYEsDU+uzxV2XmIMWBIMQK0kuBxRjwoKJQ3Jsl1/9DEd4AtU6JFyZfnAQXviBh65vjiS8GFYSg28JOqvXcAPf1PaTCF0GyEUqyJyen8q6LJXJfExN0XUtxJBInWk5KGI07sKLe9m/IXP1byrIWQv+OwqjV3IB1iLO9L2Iss/5FGmsIYxZDYtyFZyHMm+KJLwK6Mh3zRClx01aZ7H5WT2oxlug4BJZyFeQHoc8CuWHuAeqpqallosQhKWGi+MME4VLrc5oQxBFfDFGc0pttAbYdhQnKEMbIsd4b8hEhR8oThjMFPGei4xYsMyUe7jvqB4sUZlBGRsdkMWsxJRKFhZkXxyxKeoEwK0VKTBhNCBh/OLXTJpOHPgiSt8eSvy6i6RgdD5lIZQujsSXC4Et6/Vg88cVhF5jTle2Ukd56EBvFFAwWh4YQ6Hl1fNQZrA6CEIF+bJnLWguJubJlSEsXBqLTh96tBGc1ITDCY8UogA5UeTeAiuLT5v6Xywv+eVEAN/g9ZGW7Y0kvCgZ6zhignuz6O7iwniWiUTN+hHBhtk2zGGJiYnLNYL8SyQmT9mCbbi0lmeY/h0u7Q0m20wbxYhQiCv4KujXUrv/fyxSGYxh9oT36UwwwH4gnvgg4yldrablXRnsPqOsigSSbg8dsgQuLQBfGtLhQlPXEqY7FGGg1U4ceV2vR6ZoSEgKKF01iRnUu85NyxzE2R6bzZBPNEhx7KJb4ovAZ2UTXl7y12GQjZ4RpFbSWSBDbbk4HkCQ5EmY9UYhquTId3wADzZ+Xhbq7JMsHCpXiyhQ2sGQCEOzbgkH7L65h5K+uDOLM90p4HL41jvgioMUsttwtoxdeV2vRTIwkQhhOPhYKQjBdHkUyUCjK5gkTuTFrR8Kc6fgfmdn/gMWNkiwGXKgL26LiqCvTczJlzJWpD4tcGa3GX0tmo3Y/pVICKMzs8Sdl+FK7xhSCRA+PwI1hIBkJYlsTmZmd1ekYy9qWCxALTSSY3Vnd3ZOcK+OY5gTiDC/0GP/lU7Ca7UZyjBiFKAz6Gmf23ym5qbQe83pljRhjL53+R+XOfkbCljsk0EEivpyIEWI1bpTxM9/Ss42cmLRzKAz65sYKCwUaGxvT32fwOVpCMag1AWZVQ/kzmElAZ6EpENq97S/K7IH7SrIYpsvRAFPjUvteyc0Uvz1jTYuJerNd6PcNDDLvUUHUakoUhinyUN9hWACDvvXqJfdU6KoigvkZa8dayArk/9Yv05WtJLSi6ORUTaf0dNTL9P6HNQmIFaMAKp4XRqd1LryAUf9VT/TaZY0YwzcDxXHjh5GZvUPJzp+PXyFCHOaPPgo31oreHRFIt4M6TyjB3m9Woi5JsQGLKRC8u/tMPKGVAiyGM9ApZGeTB98Hsouf+YxSZXVnvNNM72xeP76wrO3KVBRdsJNlHe+22LKeK/NTL2zrdEzzDllo3QW8VRZb90iWdduePLieyOJ3i/oZA5dLgX6+jZ8Hjjwg8wfv1+n6ZLDbUM/6PrilW4x0Bncl3upVwmjgp0AAbzmfTIHXpTnBtUq8K1tZoLBL7wXh25bmvgoF8aCbC5pvAUm7jLQjIC9pqED3q1AqTH0VQcHqdoF4XtRho/s4YbJ6FhQctX8E8eU8CGWPX7+UJAyfkeIGXpKg7T5YAgZXa7kyWMvY2R/I0MA5BPx+GRzguZa+hHFR64HBXunp7pR0+njVkGKd6pCzx1+BSG+z4A4BVgpjloX2ha/mLywvVkqzGLq2hUEJeTWmTrHEW8xsx1OIKcdlYMjHjxJjRbnQZAGIYk3SI/+V6Ex1a+xJd3bKlcNPQRjEkAJR8sLsw4j/wJvFTZwAkxy4V8hiNDsLFyTs/qRkW27Lx5GVmEr9pQz1d4G0wiC/OpuqHLwwmkTwgr+Es7KVwNiGM9AnkEqPNH5CsnW3xQtDnHhGcnOXNL5UVBj6s1zmxxIi2K71zMo5tZhjRlrionhgOwODI2hHt2HEEJgQ7EJC1J0dsJi9sBh/lSdG+ayjc/2ML67v2yLBJNn0WL+UbjGs3aKE6d+GCPHPtQyat+sVL0P954ywgvFLErjsv/8yRNHbMCAML6qoHjhVk5L+1ucQY+7xmZlNVDq95RCoAy8ND4qbOgUGmY1VUBh+D02QzyMLL30NSUD8Hcs6mwxrsrEO18GUYz5XMeg2GO8Y97Ddek4qMvhWBwzqUTa2BI7wsS9MBLhMl9b3HQR9sxYmUtbN1y8lBn8TBm/idExjzyRbTRR2SmsjSu+j0Top+H1o8G1es7XCxycJjk/s3hcTwdoArEXHLWgHB+7wNyzxFIdxWIIuJboy/SYELbxCWs7Qy8jJ748RZovkPFl6gqwKFsNxlVkpRKmvrjC8hYMWw6sso1R56dnNnE3G/vR+S3LBVRVDMzKjtGgpMcbou4mNt9ziiAS0Gj2XTyvBjiQtwlqg5fh2rTyyxOmzBuAtmh+VHG9UKqOU6MpoK6qKKq4p39g+CY49aMT4nruMsGqhxoRhFmZPm90mrv9HsJb1TyGvVTYQ/PlmObiJBOd27rMSHrk9f7XlMsKqhVoTxgd+/kOh3NwA+3JZZUPCEK4ggOWyoxg4fQCkbFsiqtqoOWHg2ut3IuAfQT8OlKdySonCmJXoNlQTa+utGqM/QyLwNhBkQZgE6e151bKiTRZGxypwX9ENuK7+VgzE/1cknAU/8DDFJ5JjS4kxZnVRYdSCshL2/b0ErXeDHOwoBdFEgIlBAYFJYROF0TSZYnhReAF62PU5yc1nvIchR+Upc03CaOHGdUbgKWQhfBoSEgHedq5kVSFT22RhONDk+Xy9kK/jaX36Be/3Vn7yJG28XLPFaE0sIt50/Z6ELTsw4DOLWUZgUthMV8YBJLOwfeiQTI05e6xPLOeFJkyUSh+3rCxlC6MZGvoGto7aXm72jP4npaw+bwYDrUICk8ImCqMxhdbS+DCCfauKolMuETg3VqYy5QsTU1SeuV5kau8Xp8IwCdiig1BeXK5zaIWkVgLVEobW4d2WTrWg1imYhndIbuoMhPBqVKhUWBjuG3pJcFVCPrkclsMbl+jWNO4UkFgxVFEYmw9jwLdTxUHTI+a+wuXXyFWiVFYY7TTMQpy4uTck7P4DCfTEGg5GLWaJxIqhSsIw+7I5MFoK6qO/I7mrJ8RpTPED79q1mKUd1J2F5eTO/ZXdXwMC7UrOCqNawnj3xceOuJOf0uwLR7l0vP7YK1UqKozNQLP4i8XR0gxl8Ad65lMfnF3pOFNNi4EwfFJf/oI9PUA2ouOuXKmwMMuLCcNBKFzb7Glxp/ZqOm1JAF0bDprnUnTZBqdctkHqEuHrogLC8GQWz63YKB7b1ngSieFPhLW8R3Jjjci85nFcZiVelURKssJgvwvdmwtnJOz/uoTtD4B85P4NPGVAIZYI1n9S6okuCRURBmJo/MC+vI79YrZFMTh1f+hecWe+KLmF4fxxREhQl2SFwd5b78o/2YLrYPjzl8Sd+wsJW/kvGEHMsjsINphWV0AYHY9QDB/cNcDrPyb9fbty0v+bq+g/4LKzmftKTpmEheGPf1EQPTi7dgDmg8ztvARdTyNzu1XFoDgmEMVaInxdVEQYy7QWX/P/d7n9SXETR5EGL3pB2MfsOLigtT6HGnVCJVlhWLjvyw7KDlJ/wQpvbrZLXN+XQQgfjcL5Nro4Dk4LBQCBUZsWxd8Bug61nsrOP0KecQFtdUlcB9F0PV2VjyX5Nmp+5uA9kuv5W6TAFMT/b2XdRb5ZnMwve/A9qZK8MCUU6qTuLpwWN/SKhF0f02sKgmab1uHZUYtFJpZdP71F1+kYCSLas/15RzGFgEgKCKCBnNd32TLBu8E0w4IYru0JCfte9DPCyCB9TNzsUhvCRC8dqEX3ZcLlTbZJ+MZfI9WGJTXT3YHcAisxy6FoEIDr6yCaCkFrwO9gEdrWjAvt+lsle+AOCTkO4X8dD2b9tmz7+oO2utpNLjViMUvEwHRUFP1fAiHA1Q4ELgxIOI2R9tjPxfV/EwPXz0rY+RFx/MfarXdDrG32bP+DdyFmvQfrPiSu89Pizr8AK/wFXNQxDAp79W5h6wD87oKam1bQZbG1uaV2hCHyqXW0jsuep4L11ubK5Z/zb1brei6ZBdgqLnFdtB2Colibv1Foe3NLTQhzvawu14Wp0XJdmJosIv8HVk+3kr2QtxUAAAAASUVORK5CYII=";
			if($scope.settings.form.documentImage != ""){
					var imgsaveurl=webservice.principal + webservice.urls.saveImage;
					var docid = 0;
					if($scope.settings.documents.documentid !=""){
						docid = $scope.settings.documents.documentid;
					}
					
					
				$http.post(imgsaveurl, {userid: $scope.userInfo.userid,documentid: docid,newupload:$scope.new_image, documenttype: $scope.settings.form.documentType,image: $scope.settings.form.documentImage64 }).then(function (res){
					$scope.settings.form.documentID = res.data.documentid;
					$scope.settings.form.documentType = res.data.documenttype;
					$scope.settings.form.documentImage64 = res.data.documentimage;
					$scope.settings.form.documentImage = "data:image/jpeg;base64," + res.data.documentimage;
				});
			}
		}else{
				var alertPopup = $ionicPopup.alert({
					title: 'Required',
					template: 'Please fill all the required fields!'
               });
               alertPopup.then(function(res) { });

		}
		
	};
	
 
    $scope.addImage = function() {
		var options = {
			destinationType : Camera.DestinationType.DATA_URL,//Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
			allowEdit : false,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
		};
		$cordovaCamera.getPicture(options).then(function(imageData) { 
		
			$scope.settings.form.documentImage = "data:image/jpeg;base64," + imageData;
			$scope.settings.form.documentImage64 = imageData;
			$scope.is_image_loaded = true;
			$scope.new_image = true;
			//$scope.imgUrl = imageData;
		//$scope.images = [];
		
		/*onImageSuccess(imageData);
 
		function onImageSuccess(fileURI) {
			createFileEntry(fileURI);
		}
 
		function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		}
 
		// 5
		function copyFile(fileEntry) {
			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			var newName = makeid() + name;
 
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
				fileEntry.copyTo(
					fileSystem2,
					newName,
					onCopySuccess,
					fail
				);
			},
			fail);
		}
		
		// 6
		function onCopySuccess(entry) {
			$scope.$apply(function () {
				$scope.images.push(entry.nativeURL);
			});
		}
 
		function fail(error) {
			console.log("fail: " + error.code);
		}
 
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
			for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
 */
	}, function(err) {
		//console.log(err);
	});
    }
	
    $scope.urlForImage = function(imageName) {
		var name = imageName.substr(imageName.lastIndexOf('/') + 1);
		var trueOrigin = cordova.file.dataDirectory + name;
		return trueOrigin;
    }
})
.controller('controller_course_trainer', function($sce,$rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaGeolocation, $cordovaFileTransfer,$cordovaLaunchNavigator) {
    var courseid = $stateParams.programId;
    var batch_id = $stateParams.batch_id;
    var link = webservice.principal + webservice.urls.programByID;
    $scope.data = [];
    $scope.contents = [];
    $scope.units = [];
	$scope.noteslist = {};
	$scope.itempresentation_enabled = "item";
	$scope.itemcvs_enabled = "item";
    $scope.forms = {
        studentsdropdown: true,
        icon: 'icon ion-android-arrow-dropright-circle',
        informationdropdown: true,
        icon2: 'icon ion-android-arrow-dropright-circle',
        contentdropdown: true,
        icon3: 'icon ion-android-arrow-dropright-circle',
		notescontent:true,
		icon5: 'icon ion-android-arrow-dropright-circle',
		venuedropdown: true,
		feedbackclass: 'icon ion-android-arrow-dropright-circle',
		feedbackcontent:true,
		attclass: 'icon ion-android-arrow-dropright-circle',
		attclassopen:true,
		balanceclass: 'icon ion-android-arrow-dropright-circle',
		balancecontent:true
    };
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.show_loading();
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
			   
               $scope.hide_loading();
               $scope.getdata();
           }
        }, null);
     });
	 $scope.formsStudentTrainer = {};
	$scope.requestFeedback = function(){
		var linksendEmail = webservice.principal + webservice.urls.sendEmailParticipantsFeedback;
		if($scope.data.list.info[0].feedback_url_students != ""){
		$http.post(linksendEmail, {course_id: $stateParams.programId, batch_id: batch_id}).then(function (res){
			alert("An email has been sent to every stundent confirmed for this course");
		});
		}else{
			alert("There isn't a feedback test assigned to this batch yet");
		}
	};
	$scope.feedbackStatus = function(){
		window.open($scope.data.list.info[0].feedback_url_trainer);
		//$state.go('menu.participants_feedback_trainer',{course_id:$stateParams.programId, batch_id: batch_id,user_id:$scope.userInfo.userid,user_role: $scope.userInfo.role});
	};
    $scope.getdata = function(){
        $http.post(link, {role_id : $scope.userInfo.role ,userid: $scope.userInfo.userid, courseid: $stateParams.programId, batch_id: batch_id}).then(function (res){
            console.log(res.data);
            $scope.data.list = res.data;
			if($scope.data.list.info[0].pdf_url.length < 2){
				$scope.itempresentation_enabled = "item item-divider";
			}
			if($scope.data.list.info[0].cvs_url.length < 2){
				$scope.itemcvs_enabled = "item item-divider";
			}
			
        });
		var link_contents = webservice.principal + webservice.urls.getContentsByCourse;
		$http.post(link_contents, {courseid: $stateParams.programId}).then(function (res){
			$scope.contents = res.data;
        });
    };
	var getnotesbycoursebyuserid = webservice.principal + webservice.urls.getNotesByCourseByUserid;
	$scope.getDataNotes = function(){
		$http.post(getnotesbycoursebyuserid, {userid: $scope.userInfo.userid, courseid: $stateParams.programId}).then(function (res){
			//console.log(res.data);
			$scope.noteslist =res.data;
        });
	};
    $scope.hide_students = function(){
        /*if($scope.forms.studentsdropdown){
            $scope.forms.studentsdropdown = false;
            $scope.forms.icon = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.studentsdropdown = true;
            $scope.forms.icon = 'icon ion-android-arrow-dropright-circle';
        }*/
		$state.go("menu.participants_trainer",{userid: $scope.userInfo.userid,courseid:$stateParams.programId,batchid:batch_id});
    };
	$scope.googlemapsapi ="";
	var map;
    $scope.show_hidevenue = function(){
        if($scope.forms.venuedropdown){
            $scope.forms.venuedropdown = false;
            $scope.forms.icon2 = 'icon ion-android-arrow-dropup';
			if($scope.data.list.info[0].venue.length > 2){
				var destination = [$scope.data.list.info[0].latitude, $scope.data.list.info[0].longitude];
				var start = [0,0];
				$cordovaLaunchNavigator.navigate(destination).then(function() {
				  //alert("Navigator launched");
				}, function (err) {
				  //alert(err);
				});
			}
        }else{
            $scope.forms.venuedropdown = true;
            $scope.forms.icon2 = 'icon ion-android-arrow-dropright-circle';
        }
    };
	$scope.onMapReady= function () {
		
	};
	$scope.trustSrcurl = function(data) 
		{
			return $sce.trustAsResourceUrl(data);
		};
	$scope.gotocalendar = function(){
        $state.go("menu.myCalendar");
    };
	$scope.addnewnote = function(){
		$state.go("menu.addeditnote",{programId: courseid ,noteid:0,option:false});
	};
	$scope.viewcont = function(urlid){
		//window.open($scope.contents[urlid], '_blank');
		var url = $scope.contents[urlid];
		var name = $scope.contents[urlid].split("/");
		$scope.show_loading();
		ionic.Platform.ready(function(){
             
             var targetPath = cordova.file.dataDirectory + name[name.length -1 ];
              $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                    $scope.hasil = 'Save file on '+targetPath+' success!';
					alert('File '+name[name.length -1 ]+' saved success!');
					$scope.hide_loading();
              }, function (error) {
                    $scope.hasil = 'Error Download file';
					alert('Error Download file');
					$scope.hide_loading();
              }, function (progress) {
//
              });
		});
	};
	$scope.mypopup = null;
    $scope.hide_content = function(){
		var temp = '<ul class="list">';
		for(var i=0; i< $scope.contents.length;i++){
		var name = $scope.contents[i].split("/");
		temp = temp +'<li ng-click="viewcont('+i+')" class="item"><a class="item-content">'+name[name.length -1 ]+'</a></li>';
		}
		temp = temp +'</ul>';
		if($scope.contents.length > 0){
		$scope.mypopup = $ionicPopup.show({
		template: temp,
		title: 'Select File',
		subTitle: '',
		scope: $scope,
		buttons: [
			{ text: 'Cancel' }
		]
		});
		$scope.mypopup.then(function(res) {		
			$scope.mypopup.close();
		});
		}else{
			alert("There's no file to download in this course yet");
		}
    };
	$scope.toggleNotesContent = function(){
		if($scope.forms.notescontent){
            $scope.forms.notescontent = false;
            $scope.forms.icon5 = 'icon ion-android-arrow-dropup';
			//refresh list
			$scope.getDataNotes();
        }else{
            $scope.forms.notescontent = true;
            $scope.forms.icon5 = 'icon ion-android-arrow-dropright-circle';
        }
	};
	$scope.togglefeedback = function(){
		if($scope.forms.feedbackcontent){
            $scope.forms.feedbackcontent = false;
            $scope.forms.feedbackclass = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.feedbackcontent = true;
            $scope.forms.feedbackclass = 'icon ion-android-arrow-dropright-circle';
        }
	};
	$scope.togglebalance = function(){	
	if($scope.forms.balancecontent){
            $scope.forms.balancecontent = false;
            $scope.forms.balanceclass = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.balancecontent = true;
            $scope.forms.balanceclass = 'icon ion-android-arrow-dropright-circle';
        }
	};
	$scope.mypopup = null;
	$scope.openOptions = function(noteid) {
	  $scope.data = {};
	  // An elaborate, custom popup
	  $scope.mypopup = $ionicPopup.show({
		template: '<ul class="list"><li class="item" ng-click="viewnote('+noteid+')"><a class="item-content">View Complete Note</a></li><li class="item" ng-click="editnote('+noteid+')"><a class="item-content">Edit Note</a></li><li class="item" ng-click="removenote('+noteid+')"><a class="item-content">Remove Note</a></li></ul>',
		title: 'Select Option',
		subTitle: '',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' }
		]
	  });

	  $scope.mypopup.then(function(res) {
	  });
	};
	$scope.viewnote = function(noteid){
		$scope.mypopup.close();
		$state.go("menu.addeditnote",{programId: courseid ,noteid:noteid,option:true});
	};
	$scope.editnote = function(noteid){
		$scope.mypopup.close();
		$state.go("menu.addeditnote",{programId: courseid ,noteid:noteid,option:false});
	};
	var deletenotebyidlink = webservice.principal + webservice.urls.deletenotebyid;
	$scope.removenote = function(noteid){
		$scope.mypopup.close();
		$http.post(deletenotebyidlink, {userid: $scope.userInfo.userid, courseid: courseid, noteid: noteid}).then(function (res){
			alert("The note has been successfully removed!");
			$scope.getDataNotes();
		});
	};
	$scope.openPretest= function(){
		$state.go("menu.pretest",{userid:$scope.userInfo.userid,courseid: courseid});
	};
	$scope.openPDF = function(){
		if($scope.data.list.info[0].pdf_url.length > 2){
		window.open($scope.data.list.info[0].pdf_url, '_blank');
		}
	};
	$scope.openCVS = function(){
		if($scope.data.list.info[0].cvs_url.length > 2){
		window.open($scope.data.list.info[0].cvs_url, '_blank');
		}
	};
	$scope.openAttenance=function(){
		if($scope.forms.attclassopen){
            $scope.forms.attclassopen = false;
            $scope.forms.attclass = 'icon ion-android-arrow-dropup';
			var link = webservice.principal + webservice.urls.getUnitsByCourseTrainer;
			$http.post(link, {userid: $scope.userInfo.userid, courseid: courseid}).then(function (res){
				$scope.units = res.data;
				for(var i = 0;i< res.data.length;i++){
				var b = i;
				$scope.units[i].day = b+1;
			}
			});
        }else{
            $scope.forms.attclassopen = true;
            $scope.forms.attclass = 'icon ion-android-arrow-dropright-circle';
        }
	};
})
.controller('controller_pretest', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
	$scope.data ={
		userid:$stateParams.userid,
		courseid:$stateParams.courseid,
		usershowsave:true
	};
	$scope.list = [];
	$scope.answers = [];
	var link = webservice.principal+webservice.urls.getExamByCourseid;
	var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
			   if($scope.userInfo.role="1"){
				   $scope.data.usershowsave=false;
			   }
			   	$http.post(link, {userid: $scope.data.userid, courseid: $scope.data.courseid}).then(function (res){
						$scope.list =res.data;
						for(var examsi=0;examsi < $scope.list.length;examsi++){
							$scope.answers[examsi]={};
							$scope.answers[examsi].courseid=$scope.list[examsi].course_id;
							$scope.answers[examsi].examid=$scope.list[examsi].examid;
							$scope.answers[examsi].correct_answer=$scope.list[examsi].correct_answer;
							$scope.answers[examsi].an1=false;
							$scope.answers[examsi].an2=false;
							$scope.answers[examsi].an3=false;
							$scope.answers[examsi].an4=false;
							$scope.answers[examsi].an5=false;
						}
						
				});

           }
        }, null);
     });
	$scope.selectAnswer = function(examid,option){
		$scope.answers[examid].an1=false;		
		$scope.answers[examid].an2=false;
		$scope.answers[examid].an3=false;
		$scope.answers[examid].an4=false;
		$scope.answers[examid].an5=false;
		if(option == "1"){$scope.answers[examid].an1=true;}
		if(option == "2"){$scope.answers[examid].an2=true;}
		if(option == "3"){$scope.answers[examid].an3=true;}
		if(option == "4"){$scope.answers[examid].an4=true;}
		if(option == "5"){$scope.answers[examid].an5=true;}
	};
	$scope.back= function(){
		if($scope.userInfo.role == "1"){
			$state.transitionTo("menu.view_course_trainer",{programId: $scope.data.courseid},{'reload':true});
		}else{
			$state.transitionTo("menu.view_course_employee",{programId: $scope.data.courseid},{'reload':true});
		}
	};
	
	$scope.saveExam=function(){
		var saveexaml=webservice.principal+webservice.urls.saveExamResult;
		for(var i=0;i<$scope.answers.length -1;i++){
			var answer=0;
			var correct = 0;
			var examid=$scope.answers[i].examid;
			if($scope.answers[i].an1==true){answer=1;}
			if($scope.answers[i].an2==true){answer=2;}
			if($scope.answers[i].an3==true){answer=3;}
			if($scope.answers[i].an4==true){answer=4;}
			if($scope.answers[i].an5==true){answer=5;}
			if(answer.toString() == $scope.answers[i].correct_answer){
				correct=1;
			}
			$http.post(saveexaml, {
				userid: $scope.data.userid, 
				courseid: $scope.data.courseid, 
				examid: examid,
				answer:answer,
				correct:correct
				}).then(function (res){ 
				var all= $scope.answers.length -2;
				if($scope.answers[all].examid ==res.data.examid){
					alert("the resutls has been sent!!");
					if($scope.userInfo.role == "1"){
						$state.transitionTo("menu.view_course_trainer",{programId: $scope.data.courseid},{'reload':true});
					}else{
						$state.transitionTo("menu.view_course_employee",{programId: $scope.data.courseid},{'reload':true});
					}
				}
			});
		}
	};
})
.controller('controller_course_employee', function($sce,$rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaGeolocation, $cordovaFileTransfer,$cordovaLaunchNavigator) {
    var courseid = $stateParams.programId;
	var batch_id = $stateParams.batch_id;
    var link = webservice.principal + webservice.urls.programByID;
    var link_feedback = webservice.principal + webservice.urls.getFeedback;
    $scope.data = [];
    $scope.units = [];
    $scope.feedback = [];
	$scope.noteslist = {};
	$scope.itempresentation_enabled = "item";
	$scope.itemcvs_enabled = "item";
    $scope.forms = {
        studentsdropdown: true,
        icon: 'icon ion-android-arrow-dropright-circle',
        informationdropdown: true,
        icon2: 'icon ion-android-arrow-dropright-circle',
        contentdropdown: true,
        icon3: 'icon ion-android-arrow-dropright-circle',
		notescontent:true,
		icon5: 'icon ion-android-arrow-dropright-circle',
		venuedropdown: true,
		feedbackclass: 'icon ion-android-arrow-dropright-circle',
		feedbackcontent:true,
		attenanceclass: 'icon ion-android-arrow-dropright-circle',
		divAttenance:true
    };
    $scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
               
               $scope.getdata();
           }
        }, null);
     });
	
    $scope.getdata = function(){
		$scope.show_loading();
        $http.post(link, {role_id : $scope.userInfo.role ,userid: $scope.userInfo.userid, courseid: $stateParams.programId, batch_id: batch_id}).then(function (res){
			$scope.hide_loading();
            console.log(res.data);
			
            $scope.data.list = res.data;
			if($scope.data.list.info[0].pdf_url.length < 2){
				$scope.itempresentation_enabled = "item item-divider";
			}
			if($scope.data.list.info[0].cvs_url.length < 2){
				$scope.itemcvs_enabled = "item item-divider";
			}
			if($scope.data.list.info[0].confirmed_course == "0"){
				/*var myPopup = $ionicPopup.show({
						template: '',
						title: 'Confirm Course',
						subTitle: '',
						scope: $scope,
						buttons: [
						  {
							text: '<b>Confirm</b>',
							type: 'button-positive',
							onTap: function(e) {
							 var lconfirmProgram = webservice.principal + webservice.urls.confirmProgram;
							 $http.post(lconfirmProgram, {selection : 'confirm' ,userid: $scope.userInfo.userid, courseid: $stateParams.programId, batch_id: batch_id}).then(function (res){
								 alert("You have confirmed your participation in this course");
							 });
							}
						  },
						  {
							text: '<b>Decline</b>',
							type: 'button-positive',
							onTap: function(e) {
							  var lconfirmProgram = webservice.principal + webservice.urls.confirmProgram;
							 $http.post(lconfirmProgram, {selection : 'decline' ,userid: $scope.userInfo.userid, courseid: $stateParams.programId, batch_id: batch_id}).then(function (res){
								alert("You have declined your participation in this course");
								$state.transitionTo("menu.view_programs_employee", null, {'reload':true});
							 });
							}
						  }
						]
					  });

					  myPopup.then(function(res) {
						//console.log('Tapped!', res);
					  });*/
			}
        });
        $http.post(link_feedback, {}).then(function (res){
            $scope.feedback = res.data;
			for(var ii = 0; ii < res.data.length;ii++){
				$scope.feedback[ii].feedbackquestionid=$scope.feedback[ii].feedbackquestionid;
				$scope.feedback[ii].ii=ii;
				$scope.feedback[ii].question=$scope.feedback[ii].question;
				$scope.feedback[ii].answer1=$scope.feedback[ii].answer1;
				$scope.feedback[ii].answer2=$scope.feedback[ii].answer2;
				$scope.feedback[ii].answer3=$scope.feedback[ii].answer3;
				$scope.feedback[ii].answer4=$scope.feedback[ii].answer4;
				$scope.feedback[ii].answer5=$scope.feedback[ii].answer5;
				$scope.feedback[ii].an1=false;
				$scope.feedback[ii].an2=false;
				$scope.feedback[ii].an3=false;
				$scope.feedback[ii].an4=false;
				$scope.feedback[ii].an5=false;
				$scope.feedback[ii].pointage_answer1=$scope.feedback[ii].pointage_answer1;
				$scope.feedback[ii].pointage_answer2=$scope.feedback[ii].pointage_answer2;
				$scope.feedback[ii].pointage_answer3=$scope.feedback[ii].pointage_answer3;
				$scope.feedback[ii].pointage_answer4=$scope.feedback[ii].pointage_answer4;
				$scope.feedback[ii].pointage_answer5=$scope.feedback[ii].pointage_answer5;

				if($scope.feedback[ii].answer1 == ""){$scope.feedback[ii].answer1hide = true;}
				if($scope.feedback[ii].answer2 == ""){$scope.feedback[ii].answer2hide = true;}
				if($scope.feedback[ii].answer3 == ""){$scope.feedback[ii].answer3hide = true;}
				if($scope.feedback[ii].answer4 == ""){$scope.feedback[ii].answer4hide = true;}
				if($scope.feedback[ii].answer5 == ""){$scope.feedback[ii].answer5hide = true;}
						
			}
        });
		var link_contents = webservice.principal + webservice.urls.getContentsByCourse;
		$http.post(link_contents, {courseid: $stateParams.programId}).then(function (res){
			$scope.contents = res.data;
        });
    };
	$scope.saveFeedback = function(){
		alert("Thanks. Your feedback has been sent to our support team");
		for(var ii=0;ii<$scope.feedback.length;ii++){
		var questionid = $scope.feedback[ii].feedbackquestionid;
		var savefeedback_link = webservice.principal + webservice.urls.saveFeedback;
		var answerpointage = -1;
		if($scope.feedback[ii].an1){answerpointage = $scope.feedback[ii].pointage_answer1;}
		if($scope.feedback[ii].an2){answerpointage = $scope.feedback[ii].pointage_answer2;}
		if($scope.feedback[ii].an3){answerpointage = $scope.feedback[ii].pointage_answer3;}
		if($scope.feedback[ii].an4){answerpointage = $scope.feedback[ii].pointage_answer4;}
		if($scope.feedback[ii].an5){answerpointage = $scope.feedback[ii].pointage_answer5;}
		if(answerpointage != -1){
		$http.post(savefeedback_link, 
		{userid: $scope.userInfo.userid, 
		courseid: $stateParams.programId,
		questionid: questionid,
		answerpointage: answerpointage
		}).then(function (res){
			//console.log(res);
        });
		}
		
		}
		
	};
	$scope.selectoption = function(questionid,option){
		$scope.feedback[questionid].an1=false;		
		$scope.feedback[questionid].an2=false;
		$scope.feedback[questionid].an3=false;
		$scope.feedback[questionid].an4=false;
		$scope.feedback[questionid].an5=false;
		if(option == "1"){$scope.feedback[questionid].an1=true;}
		if(option == "2"){$scope.feedback[questionid].an2=true;}
		if(option == "3"){$scope.feedback[questionid].an3=true;}
		if(option == "4"){$scope.feedback[questionid].an4=true;}
		if(option == "5"){$scope.feedback[questionid].an5=true;}
	};
	var getnotesbycoursebyuserid = webservice.principal + webservice.urls.getNotesByCourseByUserid;
	$scope.getDataNotes = function(){
		$http.post(getnotesbycoursebyuserid, {userid: $scope.userInfo.userid, courseid: $stateParams.programId}).then(function (res){
			//console.log(res.data);
			$scope.noteslist =res.data;
        });
	};
    $scope.hide_students = function(){
        if($scope.forms.studentsdropdown){
            $scope.forms.studentsdropdown = false;
            $scope.forms.icon = 'icon ion-android-arrow-dropup';
        }else{
            $scope.forms.studentsdropdown = true;
            $scope.forms.icon = 'icon ion-android-arrow-dropright-circle';
        }
    };
	$scope.googlemapsapi ="";
    $scope.show_hidevenue = function(){
        if($scope.forms.venuedropdown){
            $scope.forms.venuedropdown = false;
            $scope.forms.icon2 = 'icon ion-android-arrow-dropup';
			if($scope.data.list.info[0].venue.length > 2){
				//$scope.googlemapsapi = webservice.principal + webservice.apis.googlemaps + '?venue='+encodeURI($scope.data.list.info[0].venue);
				/*$scope.googlemapsapi = 'https://www.google.com/maps?ll='+$scope.data.list.info[0].latitude +','+$scope.data.list.info[0].longitude ;
				window.open($scope.googlemapsapi);*/
				var destination = [$scope.data.list.info[0].latitude, $scope.data.list.info[0].longitude];
				var start = [0,0];
				/*$cordovaLaunchNavigator.isAppAvailable($cordovaLaunchNavigator.APP.GOOGLE_MAPS, function(isAvailable){
				var app;
				if(isAvailable){
					app = $cordovaLaunchNavigator.APP.GOOGLE_MAPS;
				}else{
					app = $cordovaLaunchNavigator.APP.APPLE_MAPS;
				}
				$cordovaLaunchNavigator.navigate(destination,{app: app}).then(function() {
				  alert("Navigator launched");
				}, function (err) {
				  alert(err);
				});
			});*/
			var destination = [$scope.data.list.info[0].latitude, $scope.data.list.info[0].longitude];
			var start = [0,0];
			$cordovaLaunchNavigator.navigate(destination).then(function() {
			  //alert("Navigator launched");
			}, function (err) {
			 // alert(err);
			});
				  
				
			}
        }else{
            $scope.forms.venuedropdown = true;
            $scope.forms.icon2 = 'icon ion-android-arrow-dropright-circle';
        }
    };
	
	$scope.trustSrcurl = function(data) 
	{
		return $sce.trustAsResourceUrl(data);
	};
	$scope.gotocalendar = function(){
        $state.go("menu.myCalendar");
    };
	$scope.addnewnote = function(){
		$state.go("menu.addeditnote",{programId: courseid ,noteid:0,option:false});
	};
	$scope.viewcont = function(urlid){
		//window.open($scope.contents[urlid], '_blank');
		var url = $scope.contents[urlid];
		var name = $scope.contents[urlid].split("/");
		$scope.show_loading();
		ionic.Platform.ready(function(){
             
             var targetPath = cordova.file.dataDirectory + name[name.length -1 ];
              $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                    $scope.hasil = 'Save file on '+targetPath+' success!';
					alert('File '+name[name.length -1 ]+' saved success!');
					$scope.hide_loading();
              }, function (error) {
                    $scope.hasil = 'Error Download file';
					alert('Error Download file');
					$scope.hide_loading();
              }, function (progress) {
//
              });
		});
	};
    $scope.hide_content = function(){
		var temp = '<ul class="list">';
		for(var i=0; i< $scope.contents.length;i++){
		var name = $scope.contents[i].split("/");
		temp = temp +'<li ng-click="viewcont('+i+')" class="item"><a class="item-content">'+name[name.length -1 ]+'</a></li>';
		}
		temp = temp +'</ul>';
		if($scope.contents.length > 0){
		$scope.mypopup = $ionicPopup.show({
		template: temp,
		title: 'Select File',
		subTitle: '',
		scope: $scope,
		buttons: [
			{ text: 'Cancel' }
		]
		});
		$scope.mypopup.then(function(res) {		
			$scope.mypopup.close();
		});
		}else{
			alert("There's no file to download in this course yet");
		}
    };
	$scope.toggleNotesContent = function(){
		if($scope.forms.notescontent){
            $scope.forms.notescontent = false;
            $scope.forms.icon5 = 'icon ion-android-arrow-dropup';
			//refresh list
			$scope.getDataNotes();
        }else{
            $scope.forms.notescontent = true;
            $scope.forms.icon5 = 'icon ion-android-arrow-dropright-circle';
        }
	};
	$scope.togglefeedback = function(){
		$state.go("menu.view_course_feedback_employee",{course_id: courseid, batch_id: batch_id});
	};
	$scope.feed={
		yes:false,
		no:false
	};
	$scope.feed.no=false;
	$scope.yesfeedback = function(){
		$scope.feed.yes=true;
		$scope.feed.no=false;
	};
	$scope.nofeedback = function(){
		$scope.feed.no=true;
		$scope.feed.yes=false;
	};
	
	$scope.mypopup = null;
	$scope.openOptions = function(noteid) {
	  $scope.data = {};
	  // An elaborate, custom popup
	  $scope.mypopup = $ionicPopup.show({
		template: '<ul class="list"><li class="item" ng-click="viewnote('+noteid+')"><a class="item-content">View Complete Note</a></li><li class="item" ng-click="editnote('+noteid+')"><a class="item-content">Edit Note</a></li><li class="item" ng-click="removenote('+noteid+')"><a class="item-content">Remove Note</a></li></ul>',
		title: 'Select Option',
		subTitle: '',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' }
		]
	  });

	  $scope.mypopup.then(function(res) {
	  });
	};
	$scope.viewnote = function(noteid){
		$scope.mypopup.close();
		$state.go("menu.addeditnote",{programId: courseid ,noteid:noteid,option:true});
	};
	$scope.editnote = function(noteid){
		$scope.mypopup.close();
		$state.go("menu.addeditnote",{programId: courseid ,noteid:noteid,option:false});
	};
	var deletenotebyidlink = webservice.principal + webservice.urls.deletenotebyid;
	$scope.removenote = function(noteid){
		$scope.mypopup.close();
		$http.post(deletenotebyidlink, {userid: $scope.userInfo.userid, courseid: courseid, noteid: noteid}).then(function (res){
			alert("The note has been successfully removed!");
			$scope.getDataNotes();
		});
	};
	$scope.openPretest= function(){
		$state.go("menu.pretest",{userid:$scope.userInfo.userid,courseid: courseid});
	};
	$scope.openPDF = function(){
		if($scope.data.list.info[0].pdf_url.length > 2){
		window.open($scope.data.list.info[0].pdf_url, '_blank');
		}
	};
	$scope.openCVS = function(){
		if($scope.data.list.info[0].cvs_url.length > 2){
		window.open($scope.data.list.info[0].cvs_url, '_blank');
		}
	};
	var link_getUnitsByCourse = webservice.principal + webservice.urls.getUnitsByCourse;
	$scope.openAttenance=function(){
		if($scope.forms.divAttenance){
			$scope.forms.divAttenance = false;
			$scope.forms.attenanceclass = 'icon ion-android-arrow-dropup';
			$scope.refreshdatafeed();
		}else{
			$scope.forms.divAttenance = true;
			$scope.forms.attenanceclass = 'icon ion-android-arrow-dropright-circle';
						
		}
		
	};
	$scope.refreshdatafeed = function(){
		$scope.show_loading();
		$http.post(link_getUnitsByCourse, {userid: $scope.userInfo.userid,courseid: courseid,batch_id:batch_id}).then(function (res){
			$scope.hide_loading();
			//console.log(res.data);
			$scope.units = res.data;
			for(var i = 0;i< res.data.length;i++){
				var b = i;
				$scope.units[i].unit_id = b+1;
				$scope.units[i].show = false;
				$scope.units[i].location = $scope.units[i].latitude + ','+$scope.units[i].longitude;
				var d = new Date;
				if($scope.units[i].date != d.toISOString().slice(0,10).toString()){
					//console.log($scope.units[i].date +' != '+ d.toISOString().slice(0,10).toString());
				}
				if($scope.units[i].saved == 0 && $scope.units[i].date == d.toISOString().slice(0,10).toString()){
					$scope.units[i].show = true;
				}
				if($scope.units[i].action == 'confirm'){
					$scope.units[i].action_text = "Confirmed Attendance";
				}else if($scope.units[i].date != d.toISOString().slice(0,10) && $scope.units[i].action != 'confirm' && $scope.units[i].action != 'decline'){
					$scope.units[i].action_text = "No Confirmed";
				}else if($scope.units[i].action == 'decline'){
					$scope.units[i].action_text = "Declined Attendance";
				}
				
			}
		});
	};
	var link_saveattendance = webservice.principal + webservice.urls.saveAttenance;
	$scope.confirmattendancetoday = function(unitid,positionunit){
		var posOptions = {timeout: 20000, enableHighAccuracy: true};
		/*navigator.geolocation
			.getCurrentPosition(posOptions)
			.then(function (position) {*/
				var lat  = '0';//(position.coords.latitude).toString();
				var long = '0';//(position.coords.longitude).toString();
				var unitlat = positionunit.split(',')[0];
				var unitlong = positionunit.split(',')[1];
				var dis = getDistanceFromLatLonInKm(lat,long,unitlat,unitlong) * 1000;
				var inarea = 0;
				if(dis < 50){
					inarea = 1;
				}
				$http.post(link_saveattendance, {userid: $scope.userInfo.userid, courseid: courseid, action: 'confirm',location: lat+','+long, unitid:unitid,inarea:inarea,batch_id:batch_id}).then(function (res){
					alert("Confirmed");
					//console.log(res.data);
					$scope.refreshdatafeed();
				});
			/*}, function(err) {
			});*/
	};
	function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  return d;
	}

	function deg2rad(deg) {
	  return deg * (Math.PI/180)
	}
	$scope.declineattendancetoday = function(unitid,positionunit){
		var posOptions = {timeout: 20000, enableHighAccuracy: true};
		 /*navigator.geolocation
			.getCurrentPosition(posOptions)
			.then(function (position) {*/
			var lat  = '0';//(position.coords.latitude).toString();
			var long = '0';//(position.coords.longitude).toString();
			  $http.post(link_saveattendance, {userid: $scope.userInfo.userid, courseid: courseid, action: 'decline',location: lat+','+long, unitid:unitid,inarea: 0}).then(function (res){
					alert("Declined");
					$scope.refreshdatafeed();
				});
			/*}, function(err) {
			});*/
	};
})
.controller('controller_course_feedback_employee', function($sce,$rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice,$cordovaGeolocation, $cordovaFileTransfer,$cordovaLaunchNavigator) {
    var courseid = $stateParams.course_id;
	var batch_id = $stateParams.batch_id;
    var link = webservice.principal + webservice.urls.programByID;
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
    $scope.datalinktoform = "";
	$scope.trustSrc = function() {
	  return $sce.trustAsResourceUrl($scope.datalinktoform);
	}
    var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
           var len = results.rows.length, i;
           if(len > 0){
               $rootScope.userInfo = results.rows.item(0);
			   $http.post(link, {role_id : $scope.userInfo.role ,userid: $scope.userInfo.userid, courseid: courseid, batch_id: batch_id}).then(function (res){
					console.log(res.data);
						//https://docs.google.com/forms/d/e/1FAIpQLSdtPQHPP53SaNc6tGziXZ86WKGQYm1Wu5WvZ48zWvDSLdVQng/viewform?embedded=true
					$scope.datalinktoform = res.data.info[0].feedback_url_students.replace('?usp=sf_link','?embedded=true');
					
			   });
			   }
        }, null);
     });
   
})
.controller('controller_course_notes', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams,webservice) {
	
	if($stateParams.option == "true"){
		$scope.notesSave = true;
	}else{
		$scope.notesSave = false;
	}
	
	//console.log($scope.notesSave);
	$scope.notes = {
		courseid: $stateParams.programId,
		noteid: $stateParams.noteid,
		title:'',
		text:''
	};
	$scope.show_loading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
    };
    $scope.hide_loading = function(){
        $ionicLoading.hide();
    };
	$scope.initialize = function(){
		var db = window.openDatabase("database_temp", '1.0', 'Test DB', 2 * 1024 * 1024);
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM LOGININFO', [], function (tx, results) {
			   var len = results.rows.length, i;
			   if(len > 0){
				   $rootScope.userInfo = results.rows.item(0);
				   $scope.hide_loading();
				   $scope.getdata();
			   }
			}, null);
		 });
	};
	$scope.initialize();
	var savedatawebservice = webservice.principal + webservice.urls.saveUpdateNoteByCourse;
	var getnotesbynoteid= webservice.principal + webservice.urls.getNoteByNoteid;
	
	$scope.getdata = function(){
		if($scope.notes.noteid != 0){
		$http.post(getnotesbynoteid, {userid: $scope.userInfo.userid, courseid: $stateParams.programId, noteid: $scope.notes.noteid}).then(function (res){
			$scope.response = res.data;
			//console.log($scope.response);
			$scope.notes.noteid = res.data[0].noteid;
			$scope.notes.title = res.data[0].title;
			$scope.notes.text = res.data[0].text;
			//console.log($scope.notes);
			//console.log($scope.response);
		});
		}
	};
	$scope.goback = function(){
			//console.log($scope.userInfo.role);
			if($scope.userInfo.role == "1"){
				$state.transitionTo("menu.view_course_trainer",{programId: $stateParams.programId},{'reload':true});
			}else{
				$state.transitionTo("menu.view_course_employee",{programId: $stateParams.programId},{'reload':true});
			}
	};
	$scope.savechanges = function(){
		$http.post(savedatawebservice, {userid: $scope.userInfo.userid, courseid: $stateParams.programId, noteid: $scope.notes.noteid, title: $scope.notes.title,text: $scope.notes.text}).then(function (res){
			
			if($scope.userInfo.role == "1"){
				$state.transitionTo("menu.view_course_trainer",{programId: $stateParams.programId},{'reload':true});
			}else{
				$state.transitionTo("menu.view_course_employee",{programId: $stateParams.programId},{'reload':true});
			}
			//$scope.response = res.data;
			//$scope.notes.noteid = res.data[0].noteid;
			//alert("The note has been successfully saved!");
			//parent.history.back();
		});
		
	};
})

.controller('changePasswordCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams) {
  
})
.controller('settingsCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams) {

})
.controller('messageCtrl', function($rootScope, $scope, $ionicLoading,$http, $state, $timeout, $ionicPopup, $stateParams) {
  $scope.settings = {
    enableFriends: true
  };
});
