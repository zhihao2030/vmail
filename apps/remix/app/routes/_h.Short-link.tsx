import { MetaFunction } from "@remix-run/node";
import CopyButton from "../components/CopyButton";
import {useState} from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "short link, 短链，长链，转化" },
    {
      name: "description",
      content:
        "short link, 长链，短链，转化",
    },
    {
      name: "description",
      content: "长链转短链服务, URL缩短工具，个性化短链接，链接管理工具.短链接生成器，品牌短链接， URL重定向服务.链接跟踪工具",
    },
    {
        name: "keywords",
        content:
          "short link, 长链，短链，转化, 长链转短链服务, URL缩短工具，个性化短链接，链接管理工具.短链接生成器，品牌短链接， URL重定向服务.链接跟踪工具",
    },
      {
        name: "keywords",
        content:
          "short link, Long to Short Link Service,URL Shortening Tool,Custom Short Links,Link Management Tool,Short Link Generator,Link Tracking Tool",
      },
  ];
};

async function getData(url:string) {
  try {
    const resp = await fetch("/api/short",{
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        data: url
      },
    });
    console.log(resp)
    return await resp.json();
  } catch (e) {
    return 'try again ';
  }
}
export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const handleGetData = async () => {
    if (!inputValue) return (setResponseData('请填写需要转换的链接'))
    setLoading(true);
    try {
      const {code,msg,data} = await getData(inputValue);
      if (code === 200) {
        setResponseData(data);
        setStatus(true);
      } else {
        setResponseData(msg);
        setStatus(false);
      }
    } catch (error) {
      console.error(error);
      setStatus(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-10 mt-24 text-white">
      <div className="max-w-[1200px]">
        <>
          <div className="rounded-md border border-cyan-50/20">
            <div className="w-full rounded-t-md p-2 flex items-center bg-zinc-800 text-zinc-200 gap-2">
              <div className="flex items-center justify-start gap-2 font-bold">
                Short-Link
              </div>
              {/*<button*/}
              {/*    className="rounded ml-auto p-1"*/}
              {/*    title="refresh"*/}
              {/*    onClick={() =>{}}>*/}
              {/*  <Refresh*/}
              {/*  />*/}
              {/*  {loading ? "Loading..." : "重新生成"}*/}
              {/*</button>*/}
            </div>

            <div className="grids flex flex-col flex-1 h-[488px] overflow-y-auto p-2">
              <div className="w-full px-3 py-4">
                <textarea
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-3 py-2 h-48 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="输入需要转换的链接"/>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 float-right"
                    onClick={handleGetData}
                >
                  开始转换
                </button>
                <div className="h-[80px] w-1"></div>
                {/* 展示返回的数据或加载状态 */}
                {loading ? (
                    <div className="w-full px-3 py-4 bg-gray-900 text-white mt-4 shadow-md">
                      Loading...
                    </div>
                ) : responseData ? (
                    <div className="w-full px-3 py-4 bg-gray-800 text-white mt-4 relative">
                      {responseData}
                      {status ?                       <CopyButton
                          content={responseData}
                          className="p-1 rounded-md ml-auto transition-all duration-200 float-right"
                      />:null}
                    </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
