/**
 * @summary
 * This is for running async side effects on the client
 * which need no return, such as marking that a user has visited a page.
 */

import { use } from 'react'

export const ClientSideEffect = (props: { promise: Promise<any> }) => {
    use(props.promise)

    return null
}
