import {type LoaderFunction, MetaFunction, redirect} from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Privacy Policy" },
        {
            name: "description",
            content:
                "Virtual temporary Email. Privacy friendly, Valid for 1 day, AD friendly, 100% Run on Cloudflare",
        },
    ];
};

export const loader: LoaderFunction = async ({ params }) => {
    const id = params.id;
    console.log(id)
    return redirect(`http://39.107.248.238/smq/common/short/${id}`)
};
export default function Index() {
    return (
        <div className="mt-24 text-white w-full text-center ">
            loading....
        </div>
    );
}
