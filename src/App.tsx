import { useEffect, useState } from "react"
import { createPublicClient, http } from "viem"
import { base } from "viem/chains"
import { abi, CONTRACT_ADDRESS } from "./utils/contract"
import { Card, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Link, links } from "./links"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "./components/ui/dialog"
import { DialogHeader } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { Box } from "lucide-react"

function App() {

  const [cid, setCid] = useState<string | undefined
  >("")

  const publicClient = createPublicClient({
    transport: http(),
    chain: base
  })

  useEffect(() => {
    async function fetchCid() {
      const currentCid = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: abi,
        functionName: "getMapping"
      })
      setCid(currentCid as string)
    }
    fetchCid()
  }, [])


  return (
    <div className={`min-h-screen w-full flex flex-col gap-6 items-center justify-center bg-cover bg-center bg-[url(./assets/constellations.svg)]`}>
      <Dialog>
        <Box className="w-36 h-36" />
        <h1 className="font-mono text-5xl font-bold">IPFS.Tips</h1>
        {links.map((link: Link) => (
          <a href={link.url} target="_blank" referrerPolicy="no-referrer" className="block w-[320px]">
            <Card className="hover:scale-105 transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-3">
                <link.icon className="h-7 w-7" />
                <div>
                  <CardTitle>{link.name}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </a>
        ))}
        <DialogTrigger asChild>
          <Button>View on IPFS</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Access on IPFS</DialogTitle>
            <DialogDescription>
              <p> Thanks to <a href="https://orbiter.host" className="underline" target="_blank">Orbiter</a> this website is hosted on IPFS and controlled through <a href="https://ipcm.dev" className="underline" target="_blank">IPCM</a> smart contracts on <a href="https://base.org" className="underline" target="_blank">Base</a>. You can visit the site on a peer-to-peer level through a local IPFS node by following the steps below: </p>
              <ol className="pl-3 mt-3 list-disc">
                <li>Install the IPFS <a className="underline" href="https://docs.ipfs.tech/install/ipfs-desktop/" target="_blank">Desktop App</a> or <a className="underline" href="https://docs.ipfs.tech/install/command-line/" target="_blank" >CLI</a></li>
                <li>Start up the desktop app to run the IPFS node or in the terminal run <span className="font-mono bg-gray-100 text-xs p-1 rounded-md">ipfs daemon</span></li>
                <li>In your web browser visit
                  <span className="font-mono bg-gray-100 text-xs p-1 rounded-md break-all">http://{cid}.ipfs.localhost:8080</span>
                </li>
              </ol>
              <p className="font-bold text-black mt-3">IPCM Contract</p>
              <p>
                <span className="font-mono bg-gray-100 text-xs p-1 rounded-md break-all">{CONTRACT_ADDRESS}</span>
              </p>
              <p className="font-bold text-black mt-3">IPFS CID</p>
              <p>
                <span className="font-mono bg-gray-100 text-xs p-1 rounded-md break-all">{cid}</span>
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
