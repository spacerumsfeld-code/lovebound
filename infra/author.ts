/// <reference path="../.sst/platform/config.d.ts" />

const vpc = new sst.aws.Vpc('MyVpc')
export const cluster = new sst.aws.Cluster('MyCluster', { vpc })
export const service = cluster.addService('MyService', {
    loadBalancer: {
        ports: [{ listen: '80/http' }],
    },
    dev: {
        autostart: true,
        command: 'tsx --esm apps/author/index.ts',
    },
    image: {
        dockerfile: '/apps/author/Dockerfile',
    },
})

export const outputs = {
    cluster: service.url,
}
