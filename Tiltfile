docker_build('saltman0/nodejs-showtime:1.0.0', '.')

k8s_resource(
    workload='showtime-nodejs-deployment',
    labels=["backend"]
)