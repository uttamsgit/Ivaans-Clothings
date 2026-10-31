pipeline{
agent any

	stages {
		stage('Checkout') {
			steps {
			echo 'Source code is available from GitHub.'
			}
		}
		stage('Build Information') {
    			steps {
        		sh 'echo "Project: Ivaans Clothings"'
        		sh 'node --version'
        		sh 'npm --version'
    			}
		} 

	}
}
