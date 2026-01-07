pipeline {
    agent any
    tools {
        jdk 'JDK21'
    }

    stages {
        stage('Test') {
            steps {
                sh './ mvnw clean test'
            }
        }
    }

    post {
        success {
            echo '✅ Test Pipeline Completed Succesfully!'
            echo 'Displaying Test Reports Below... ⬇️'
            junit '**/target/surefire-reports/*.xml'
        }
        failure {
            echo '❌ Pipeline Failed!'
            junit '**/target/surefire-reports/*.xml'
        }
    }
}