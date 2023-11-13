import { useEffect } from 'react';
import { createActor } from '../../declarations/backend_backend';
import { md5 } from 'js-md5';
import React from 'react'
import { useRouter } from 'next/router';
function extractLastText(url: string) {
    const regex = /\/([^\/]+)$/;
    const match = regex.exec(url);

    if (match) {
        return match[1];
    } else {
        return null;
    }
}


function Redirect() {
    const router = useRouter();
    console.log(router, "id");
    console.log(window.location.href, "hiiii");
    useEffect(() => {
        const link = extractLastText(window.location.href)
        const hasher = md5.create()
        const actor = createActor("xyame-giaaa-aaaak-qcqja-cai", {
            agentOptions: {
                host: "https://ic0.app"
            }
        })

        console.log({ link })
        hasher.update(link as string)
        console.log({ hasher })
        const key = BigInt(`0x${hasher.hex()}`);
        console.log({ key })
        actor.getLink(key).then((result) => {
            console.log({ result })
            const final = result[0] as string
            window.location.replace(final)
        })
    }, [])
    return (
        <div>

        </div>
    );
}

export default Redirect;