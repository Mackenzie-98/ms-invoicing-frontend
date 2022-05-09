@Library('ceiba-jenkins-library') _
pipeline {
    agent {
        label 'Slave_Induccion'
    }

    tools {
        jdk 'JDK8_Centos'
    }
    /*	Versiones disponibles
      JDK8_Mac
      JDK6_Centos
      JDK7_Centos
      JDK8_Centos
      JDK10_Centos
      JDK11_Centos
      JDK13_Centos
      JDK14_Centos
*/

    stages {
        stage('Checkout'){
           steps {
				echo "------------>Checkout<------------"
				checkout scm
                }
        }

      stage('NPM Install') {
      steps {
        withEnv(['NPM_CONFIG_LOGLEVEL=warn']) {
          sh 'npm install'
        }
      }
    }


     stage('Test Unit') {
      steps{
        echo "------------>Test<------------"
        sh 'npm run test -- --watch=false --browsers ChromeHeadless'
      }
    }

        /*
        stage('Test end-to-end') {
            steps{
                echo "------------>Testing Protractor<------------"
                sh 'npm run e2e --'
            }
        }
        */

      stage('Static Code Analysis') {
			steps{
        echo '------------>Análisis de código estático<------------'
		sonarqubeMasQualityGatesP(sonarKey:'co.com.ceiba.adn:ventacomponentesfrontend.john.ramirez',
         sonarName:'''"CeibaADN-VentaComponentesFrontEnd(john.ramirez)"''',
         sonarPathProperties:'./sonar-project.properties')
			}
		}
    }

    post{
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
            mail (to: 'john.ramirez@ceiba.com.co',
            subject: "Failed Pipeline:${currentBuild.fullDisplayName}",
            body: "Something is wrong with ${env.BUILD_URL}")
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}