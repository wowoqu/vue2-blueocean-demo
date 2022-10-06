pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'node:16.17'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm config get registry'
        echo '-----  test  -----'
        sh 'npm config set registry http://registry.npm.taobao.org'
        sh 'npm install'
        sh 'export NODE_OPTIONS=--openssl-legacy-provider'
        sh 'npm run build'
        sh 'pwd'
        sh 'ls -alh'
        sh 'git --version'
        sh 'git log'
      }
    }

    stage('SSH') {
      parallel {
        stage('SSH') {
          steps {
            echo '====++++executing SSH++++===='
            sshPublisher(publishers: [sshPublisherDesc(configName: 'wowoqu', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'vue2-blueocean-demo', remoteDirectorySDF: false, removePrefix: 'dist', sourceFiles: 'dist/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
          }
        }

        stage('error') {
          steps {
            dingtalk(robot: '93699c3f-0a3e-4421-a03c-5ce3b4c4991b', atAll: true)
          }
        }

      }
    }

  }
}