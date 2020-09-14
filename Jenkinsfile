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
    post {
        success {
            mail to: '1024125388@qq.com',
                 subject: "The pipeline ${currentBuild.fullDisplayName} completed successfully.",
                 body: "Something is success with ${env.BUILD_URL}"
        }
    }
  }
}