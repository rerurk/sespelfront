export type Asset = {

    id: number
    name: string
    is_table: string
    ref: string
    image:string
    description:string
    assets :Asset[]|null
}