import { useEffect, useState } from "react"
import { UAParser } from 'ua-parser-js';

export const useDeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState<string>("")

    useEffect(() => {
        const parser = new UAParser()
        const result = parser.getResult()
        const deviceDetail = `${result.device.type || "desktop"} - ${result.os.name} - ${result.browser.name} ${result.browser.version}`;
        setDeviceInfo(deviceDetail)
    }, [])

    return deviceInfo
}