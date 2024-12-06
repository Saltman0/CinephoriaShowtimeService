docker_build('saltman0/nodejs-showtime:1.0.0', '.', entrypoint=".")

k8s_resource(
    workload='showtime-nodejs-deployment',
    port_forwards=3003,
    labels=["backend"]
)