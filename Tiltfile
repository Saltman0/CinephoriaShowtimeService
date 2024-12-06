docker_build('saltman0/nodejs-showtime:dev', '.', entrypoint=".")

k8s_resource(
    workload='showtime-nodejs-deployment',
    port_forwards=3003,
    labels=["backend"]
)