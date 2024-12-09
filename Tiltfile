docker_build('saltman0/nodejs-showtime:dev', '.')

k8s_resource(
    workload='showtime-nodejs-deployment',
    labels=["backend"]
)