import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img
            {...props}
            src="FindHire.png"
            style={{ width: '7.5rem', height: '7.5rem' }}
        ></img>
    );
}
