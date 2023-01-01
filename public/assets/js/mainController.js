app.controller('mainController', [
  '$scope',
  '$timeout',
  'mainService',
  function ($scope, $timeout, mainService) {
    // $scope.PPI_PHP = 'https://mega-download.info/dl/ppc/search.php';

    $scope.loginFormSubmitted = false;
    $scope.loginBtnText = 'Sign In';
    $scope.loginDetails = {};
    $scope.signIn = function (isValid) {
      $scope.loginResMsg = '';

      if (isValid === true) {
        $scope.loginBtnText = 'Signing...';

        mainService.postRequest(`/api/v1/signin`, $scope.loginDetails).then(
          (data) => {
            if (data && data.success === false) {
              $scope.loginResMsg = data.msg;
              $scope.loginBtnText = 'Sign In';
              return;
            }

            window.location.href = '/admin';
          },
          (err) => {
            console.log(err);
            $scope.loginBtnText = 'Sign In';
          }
        );
      } else {
        $scope.loginFormSubmitted = true;
      }
    };

    $scope.registerFormSubmitted = false;
    $scope.registerBtnText = 'Sign Up';
    $scope.registerDetails = {};
    $scope.signUp = function (isValid) {
      $scope.registerResMsg = '';

      if (isValid === true) {
        $scope.registerBtnText = 'Creating...';
        mainService.postRequest(`/api/v1/signup`, $scope.registerDetails).then(
          (data) => {
            if (data && data.success === true) {
              $scope.registerFormSubmitted = false;
              $scope.registerDetails = {};
              $scope.registerForm.$setPristine();
            }

            $scope.registerResMsg = data.msg;
            $scope.registerBtnText = 'Sign Up';
          },
          (err) => {
            console.log(err);
            $scope.registerBtnText = 'Sign Up';
          }
        );
      } else {
        $scope.registerFormSubmitted = true;
      }
    };

    $scope.file = {};
    $scope.addFileBtnText = 'Add Files';
    $scope.copyURLText = 'Copy URL';

    $scope.submitFiles = function (isValid) {
      $scope.addFileResMsg = '';
      $scope.copyURLText = 'Copy URL';
      if (isValid === true) {
        $scope.addFileBtnText = 'Adding...';
        mainService.postRequest(`/api/v1/add-files`, $scope.file).then(
          (data) => {
            if (data && data.success === true) {
              $scope.file = {};
              $scope.addFileFormSubmitted = false;
              $scope.addFileForm.$setPristine();

              const fileURLInput = document.getElementById('copyFileURLInput');
              if (fileURLInput) {
                fileURLInput.value = `${window.location.origin}${data.file.URL}`;
              }
            }

            $scope.addFileBtnText = 'Add Files';
            $scope.addFileResMsg = data.msg;
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        $scope.addFileFormSubmitted = true;
      }
    };

    $scope.resetFile = function () {
      $scope.file = {};
      $scope.addFileResMsg = '';
      $scope.addFileFormSubmitted = false;
      $scope.addFileBtnText = 'Add Files';
      $scope.addFileForm.$setPristine();
      $scope.copyURLText = 'Copy URL';
      const fileURLInput = document.getElementById('copyFileURLInput');
      if (fileURLInput) {
        fileURLInput.value = '';
      }
    };

    $scope.getFiles = function () {
      mainService.getRequest('/api/v1/files').then(
        (data) => {
          $scope.adminFiles = data.files;
        },

        (err) => {
          console.log(err);
          $scope.adminFiles = [];
        }
      );
    };

    $scope.currentPage = 0;
    $scope.isNextEnable = true;
    $scope.nextFiles = function () {
      if ($scope.isNextEnable === true) {
        $scope.currentPage = $scope.currentPage + 1;

        $scope.isNextEnable = false;
        mainService.getRequest(`/api/v1/files?page=${$scope.currentPage}`).then(
          (data) => {
            $scope.adminFiles = data.files;
            $scope.isNextEnable = true;
          },
          (err) => {
            console.log(err);
            $scope.adminFiles = [];
            $scope.isNextEnable = true;
          }
        );
      }
    };

    $scope.isPrevEnable = true;
    $scope.prevFiles = function () {
      if ($scope.isPrevEnable === true) {
        if ($scope.currentPage > 0) {
          $scope.currentPage = $scope.currentPage - 1;

          $scope.isPrevEnable = false;
          mainService
            .getRequest(`/api/v1/files?page=${$scope.currentPage}`)
            .then(
              (data) => {
                $scope.adminFiles = data.files;
                $scope.isPrevEnable = true;
              },
              (err) => {
                console.log(err);
                $scope.adminFiles = [];
                $scope.isPrevEnable = true;
              }
            );
        }
      }
    };

    $scope.splitName = function (name, count) {
      if (name) {
        let result = name.substr(0, count);
        if (name.length > count) {
          result += '...';
        }
        return result;
      } else {
        return '';
      }
    };

    $scope.months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    $scope.parseDate = function (timestamp) {
      if (timestamp) {
        const date = new Date(timestamp);
        return `${
          $scope.months[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
      } else {
        return '---';
      }
    };

    $scope.downloadFile = function (downloadURL, directDownloadURL) {
      mainService
        .postRequest(`/api/v1/increase-downloads`, { downloadURL })
        .then(
          (data) => {},
          (err) => {}
        );

      window.location.href = directDownloadURL;
    };

    $scope.fastDownload = function (fileName, downloadURL) {
      mainService.postRequest(`/api/v1/increase-ads`, { downloadURL }).then(
        (data) => {},
        (err) => {}
      );

      if ($scope.PPI_PHP) {
        window.location.href = `${$scope.PPI_PHP}?${fileName}`;
      }
    };

    $scope.generateDownloadLink = function (downloadURL) {
      if (downloadURL) {
        window.location.assign(`/download/file/${downloadURL}`);
      }
    };

    $scope.editFileText = 'Update';
    $scope.editFile = function (fileId, index) {
      mainService.getRequest(`/api/v1/file/${fileId}`).then(
        (data) => {
          if (data.success === true) {
            $scope.file = {
              fileName: data.data.name,
              fileSize: data.data.size,
              downloadURL: data.data.directDownloadURL,
              id: data.data._id,
              index
            };
            $('#editFileModal').modal('show');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    };

    $scope.updateFile = function (isValid) {
      if (isValid === true) {
        $scope.editFileText = 'Updating...';
        mainService
          .postRequest(`/api/v1/file/${$scope.file.id}`, $scope.file)
          .then(
            (data) => {
              if (data && data.success === true) {
                $scope.addFileFormSubmitted = false;
                $scope.editFileText = 'File updated!';

                $scope.adminFiles[$scope.file.index].name =
                  $scope.file.fileName;
                $scope.adminFiles[$scope.file.index].size =
                  $scope.file.fileSize;

                $timeout(() => {
                  $('#editFileModal').modal('hide');
                }, 1000);
              }
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        $scope.addFileFormSubmitted = true;
      }
    };

    $scope.copyFileURL = function () {
      const fileURLInput = document.getElementById('copyFileURLInput');
      if (fileURLInput) {
        fileURLInput.select();
        fileURLInput.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(fileURLInput.value);
        $scope.copyURLText = 'Copied!';
      }
    };

    $scope.copyURL = function (prefix, infoURL) {
      const URL = `${window.location.origin}/${prefix}/${infoURL}`;
      const fileURLInput = document.getElementById('copyFileURLInput');
      if (fileURLInput) {
        fileURLInput.value = URL;
        fileURLInput.select();
        fileURLInput.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(fileURLInput.value);
        alert('Copied!');
      }
    };

    $scope.sendGAEvent = function (
      eventCategory,
      eventAction = window.location.pathname
    ) {
      try {
        if ('ga' in window) {
          tracker = ga.getAll()[0];
          if (tracker) tracker.send('event', eventCategory, eventAction);
        }
      } catch (err) {}
    };
  }
]);
