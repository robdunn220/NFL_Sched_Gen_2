// var tWL = [1,2,3,4,5,6,7,8,9,10];
// var oWL = [1,2,3,4,5,6,7,8,9,10];
// var x, i = 0;
//
// for (i; i < oWL.length; i++) {
//   console.log("Length", oWL.length);
//   console.log("i:", i);
//   var randNum = (Math.floor(Math.random() * (tWL.length - 1)));
//   if (tWL[randNum] === oWL[i]) {
//     tWL.splice(randNum, 1);
//     oWL.splice(i, 1);
//     console.log(tWL);
//     console.log(oWL);
//   }
// }
//
// console.log("TWL:", tWL);
// console.log("OWL:", oWL);

var a = 'cde';
var b = 'abc';
var toCut = '';
var cut = 0;
console.log(anagram(a, b));
function anagram(a, b) {
  for (var i = 0; i < a.length; i++) {
    for (var x = 0; x < b.length; x++) {
      if (a[i] === b[x]) {
        i++;
        return anagram(a, b);
      }
    }
    cut++;
    toCut += a[i];
  }
  return cut;
}






// console.log(cut(arr));
//
// function cut(arr) {
//   // console.log(arr.length);
//   var min = Math.min.apply(null, arr);
//   for (var x = 0; x < arr.length; x++) {
//     if (arr[x] <= min) {
//       arr.splice(x, 1);
//     }
//     else {
//       arr[x] -= min;
//     }
//   }
//   console.log(arr);
//   if (arr.length > 0) {
//     return cut(arr);
//   }
// }


// app.controller('ScheduleGeneratorController', function($scope, NFL_Api, $rootScope, $cookies, $stateParams) {
//   $scope.divNames = [];
//   $scope.teamSchedule = [];
//
//   $scope.getAllTeams = function(callback) {
//       NFL_Api.displayAllTeams().success(function(results) {
//         $scope.allTeams = results;
//         callback();
//       });
//   };
//
//   $scope.createSchedule = function() {
//
//     $scope.divOpps = [];
//     $scope.otherDivOpps = [];
//     $scope.divPairs = [];
//     $scope.pairOneTeams = [];
//
//     if (!$scope.divDone) {
//       for (var x = 0; x < $scope.allTeams.length; x++) {
//         if ($scope.allTeams[x].division === $scope.allTeams[$scope.divNum].division) {
//           $scope.divOpps.push($scope.allTeams[x]);
//         }
//       }
//       $scope.divNames.push($scope.allTeams[$scope.divNum].division);
//
//       $scope.divOpps.forEach(function(team) {
//         for (var i = 0; i < $scope.divOpps.length; i++) {
//           if (team.name !== $scope.divOpps[i].name) {
//             $scope.match = false;
//             var index;
//             var randNum = (Math.floor(Math.random() * (team.weeksLeft.length - 1)));
//             for (var o = 0; o < $scope.divOpps[i].weeksLeft.length; o++) {
//               if (team.weeksLeft[randNum] === $scope.divOpps[i].weeksLeft[o]) {
//                 $scope.match = true;
//                 weekPickedCurrTeam = team.weeksLeft[randNum];
//                 weekPickedOtherTeam = $scope.divOpps[i].weeksLeft[o];
//                 index = o;
//               }
//             }
//
//             if ($scope.match === true) {
//               $scope.teamSchedule.push({'team': team.name, 'week': weekPickedCurrTeam, 'opponent': $scope.divOpps[i].name});
//               $scope.teamSchedule.push({'team': $scope.divOpps[i].name, 'week': weekPickedOtherTeam, 'opponent': team.name});
//               team.weeksLeft.splice(randNum, 1);
//               $scope.divOpps[i].weeksLeft.splice(index, 1);
//             }
//
//             else {
//               for (var a = 0; a < $scope.divOpps[i].weeksLeft.length; a++) {
//                 for (var b = 0; b < team.weeksLeft.length; b++) {
//                   if (team.weeksLeft[b] === $scope.divOpps[i].weeksLeft[a]) {
//                     weekPickedCurrTeam = team.weeksLeft[b];
//                     weekPickedOtherTeam = $scope.divOpps[i].weeksLeft[a];
//                     $scope.teamSchedule.push({'team': team.name, 'week': weekPickedCurrTeam, 'opponent': $scope.divOpps[i].name});
//                     $scope.teamSchedule.push({'team': $scope.divOpps[i].name, 'week': weekPickedOtherTeam, 'opponent': team.name});
//                     team.weeksLeft.splice(b, 1);
//                     $scope.divOpps[i].weeksLeft.splice(a, 1);
//                     a = $scope.divOpps[i].weeksLeft.length;
//                     b = team.weeksLeft.length;
//                   }
//                 }
//               }
//             }
//           }
//         }
//       });
//
//       $scope.divNum += 4;
//
//       if ($scope.divNum >= $scope.allTeams.length) {
//         $scope.divDone = true;
//         $scope.otherDiv = true;
//       }
//     }
//
//     if ($scope.otherDiv) {
//       for (var i = 0; i < $scope.divNames.length; i+=2) {
//         $scope.divPairs.push([$scope.divNames[i], $scope.divNames[i+1]]);
//       }
//
//       for (var c = 0; c < $scope.divPairs.length; c++) {
//         $scope.pairOneTeams[c] = [];
//         for (var d = 0; d < $scope.divPairs[c].length; d++) {
//           $scope.pairOneTeams[c][d] = [];
//           for (var e = 0; e < $scope.allTeams.length; e++) {
//             if ($scope.allTeams[e].division === $scope.divPairs[c][d]) {
//               $scope.pairOneTeams[c][d].push($scope.allTeams[e]);
//             }
//           }
//         }
//       }
//
//       var otherDivSchedule = function(divArr) {
//         divArr.forEach(function(group) {
//           group[0].forEach(function(teamOne) {
//             group[1].forEach(function(teamTwo) {
//               $scope.match = false;
//               console.log('Team one weeks left:', teamOne.weeksLeft);
//               var index;
//               var randNum = (Math.floor(Math.random() * (teamOne.weeksLeft.length - 1)));
//               for (var o = 0; o < teamTwo.weeksLeft.length; o++) {
//                 if (teamOne.weeksLeft[randNum] === teamTwo.weeksLeft[o]) {
//                   $scope.match = true;
//                   weekPickedCurrTeam = teamOne.weeksLeft[randNum];
//                   weekPickedOtherTeam = teamTwo.weeksLeft[o];
//                   index = o;
//                 }
//               }
//
//               if ($scope.match === true) {
//                 $scope.teamSchedule.push({'team': teamOne.name, 'week': weekPickedCurrTeam, 'opponent': teamTwo.name});
//                 $scope.teamSchedule.push({'team': teamTwo.name, 'week': weekPickedOtherTeam, 'opponent': teamOne.name});
//                 teamOne.weeksLeft.splice(randNum, 1);
//                 teamTwo.weeksLeft.splice(index, 1);
//               }
//
//               else {
//                 for (var a = 0; a < teamTwo.weeksLeft.length; a++) {
//                   for (var b = 0; b < teamOne.weeksLeft.length; b++) {
//                     if (teamOne.weeksLeft[b] === teamTwo.weeksLeft[a]) {
//                       weekPickedCurrTeam = teamOne.weeksLeft[b];
//                       weekPickedOtherTeam = teamTwo.weeksLeft[a];
//
//                       $scope.teamSchedule.push({'team': teamOne.name, 'week': weekPickedCurrTeam, 'opponent': teamTwo.name});
//                       $scope.teamSchedule.push({'team': teamTwo.name, 'week': weekPickedOtherTeam, 'opponent': teamOne.name});
//                       teamOne.weeksLeft.splice(b, 1);
//                       teamTwo.weeksLeft.splice(a, 1);
//                       a = teamTwo.weeksLeft.length;
//                       b = teamOne.weeksLeft.length;
//                     }
//                   }
//                 }
//               }
//
//               console.log('Team one week picked:', weekPickedCurrTeam);
//               console.log('Team one weeks left:', teamOne.weeksLeft);
//             });
//           });
//         });
//       };
//       otherDivSchedule($scope.pairOneTeams);
//       console.log($scope.teamSchedule);
//       NFL_Api.updateTeamSchedule($scope.teamSchedule).success(function(result) {});
//     }
//
//
//
//   };
//
//   if (!$scope.madeDiv) {
//     $scope.madeDiv = 1;
//     $scope.divNum = 0;
//     $scope.getAllTeams($scope.createSchedule);
//   }
//
//   while ($scope.madeDiv < 4) {
//     $scope.madeDiv += 1;
//     $scope.getAllTeams($scope.createSchedule);
//   }
// });
