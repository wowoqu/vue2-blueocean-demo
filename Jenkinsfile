pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'node'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm config get registry'
        echo '-----  test  -----'
        sh 'npm config set registry http://registry.npm.taobao.org'
        sh 'npm install'
        sh 'npm run build'
        sh 'pwd'
        sh 'ls -alh'
      }
    }
    stage("SSH"){
        steps{
            echo "====++++executing SSH++++===="
            sshPublisher(publishers: [sshPublisherDesc(configName: 'wowoqu', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'vue2-blueocean-demo', remoteDirectorySDF: false, removePrefix: 'dist', sourceFiles: 'vue2-blueocean-demo_master/dist/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
        }
    }
  }
}