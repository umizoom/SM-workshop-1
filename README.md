# Ship with Kubernetes 

This is a workshop that will be running as part of the 2026 OttawaU hack event. 

Press the "**Use this template**" button to make a copy of this template into your personal
GitHub account!

## Pre-requisites

You will need:

1. A personal GitHub account
2. Install [rancherdesktop](https://rancherdesktop.io/) or an equivalent tool to run containers. Example Docker Desktop, rancher desktop or only for mac users [colima](https://github.com/abiosoft/colima).
3. If you install rancherdesktop navigate to: Enable Kubernetes: Ensure the Enable Kubernetes option is checked in the Preferences menu. I find giving rancherdesktop 2vcpus and 6GB of memory is enough.
4. If using docker desktop Install [kind](https://kind.sigs.k8s.io/) to run local Kubernetes clusters using Docker container "nodes". 
5. Install `kubectl`. Instructions [here](https://kubernetes.io/docs/tasks/tools/#kubectl)

## Video demo

[Link to Video
](https://drive.google.com/file/d/1u1DvmXSxyOu3A9XH7Ha3Q-cbpSL8hm4M/view?usp=sharing)
## Work Shop Steps: 

1. Configure GitHub repository

    a. Go to the workshop's project repository and click Use this template.

    b. Make sure the Owner is set to your own personal GitHub account.

    c. Give it a name, we'll use sm-workshop-demo.

    d. Set the visibility to Public.

    e. Click Create repository.

    f. Go to Settings -> Actions -> General.

    g. Scroll down to Workflow Permissions and enable "Read and write permissions" under .

    h. Enable "Allow GitHub Actions to create and approve pull requests".

    i. Click Save.

2. Run GitHub Actions

    a. In GitHub, navigate to the Actions tab.

    b. Select the `Setup Repository` workflow.

    c. Click Run workflow. After the workflow finishes, you should see a PR in the repository.

    d. Check the image name in the PR, if your github username has capital letters, update the PR to make sure they are all lowercase.

3. Merge PR

    a. Navigate to Pull Requests.

    b. Check the open PR.

    c. Merge the PR. This triggers a build of the test-app application.

4. Create a cluster if using Kind

   **NOTE: If you are using rancher-desktop, then you have already created the cluster during install. You will not need to use Kind.**

    Run a command to create a new Kubernetes cluster. For example, we're using kind to create a cluster called sm-workshop-cluster. If you used rancher-desktop, the context/cluster will be named `rancher-desktop`

    ```shell
    kind create cluster --name sm-workshop-cluster
    ```

    If you have already have a cluster, you can skip this step, but take note of your cluster name so you can use it in future steps.

6. Run the bootstrap script

    a. Open up the cloned repository in your code editor.

    b. Run the `./bootstrap.sh` script.

    c. It will prompt you to press enter several times, to ensure there are no errors at each stage.

7. Check Pods Are Running

   `kubectl get pods -A`

8. Get Argocd password

   `kubectl -n argocd get secrets/argocd-initial-admin-secret --template='{{.data.password}}' | base64 -d`

9. Access ArgoCD
   
   `kubectl -n argocd port-forward service/argocd-server 8080:80`

10. Go to your browser and navigate to `localhost:8080`

11. Login to argocd with the password from Step 7. The user name is `admin`

12. Find your `test-app` and click sync then refresh

13. The test app should start up

14. Bonus points: Try to port forward the test app using kubectl


## Useful Commands

### Creating a Cluster

```shell
kind create cluster --name sm-workshop-cluster
```

### Switch Context

```shell
kubectl config use-context rancher-desktop
```


### Run the Bootstrap Script

```shell
./bootstrap.sh
```
_Make sure to run this in the folder the checked out repo is cloned into!_


### Check Pods Are Running

```shell
kubectl get pods -A
```

### Retrieve ArgoCD Admin Password

```shell
kubectl -n argocd get secrets/argocd-initial-admin-secret --template='{{.data.password}}' | base64 -d
```

### Access ArgoCD

```shell
kubectl -n argocd port-forward service/argocd-server 8080:80
```

### Access Test App

```shell
kubectl -n default port-forward service/test-app 8081:80
```
