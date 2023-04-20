export type DataType = {
    thread_id: string
    title: string
    body: string
    timestamp: number
}

interface Data {
    type: string
    targets: []
    push: {
        type: string
        source_device_iden: string
        notifications: [DataType]
    }
}

export { Data }
