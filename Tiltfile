docker_build('saltman0/nodejs-api:1.0.0')

k8s_resource(workload='showtime-nodejs-deployment', port_forwards=3003, labels=["backend"])