import { createContext, useEffect, useState } from "react"
import D from "@/definitions"
import {
    getStoragedAnimations,
    getStoragedTheme,
    setStorageAnimations,
    setStorageTheme,
} from "@/functions.ts"
import Feed from "@/components/Feed.tsx"
import Header from "./components/Header"

type Settings = {
    isAnimationsEnabled: boolean
}

export const settingContext = createContext<Settings>({
    isAnimationsEnabled: true,
})

export default function App() {
    const [theme, setTheme] = useState<D.Theme>(getStoragedTheme())
    const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(
        getStoragedAnimations(),
    )

    useEffect(() => {
        const html = document.querySelector("html")

        if (html) {
            html.className = theme
        }
    }, [theme])

    function toggleTheme() {
        setTheme((prev) => {
            let newTheme =
                prev === D.THEMES.DARK ? D.THEMES.LIGHT : D.THEMES.DARK

            setStorageTheme(newTheme)

            return newTheme
        })
    }

    function toggleAnimations() {
        setIsAnimationsEnabled((prev) => {
            setStorageAnimations(!prev)
            return !prev
        })
    }

    return (
        <settingContext.Provider value={{ isAnimationsEnabled }}>
            <div className="px-2 sm:px-20 md:px-40 lg:px-60 xl:px-[20rem] 2xl:px-[30rem] text-sm md:text-base">
                <div className="relative">
                    <div className="flex pointer-events-none items-start justify-center absolute t-0 w-full h-full">
                        <Header
                            theme={theme}
                            toggleTheme={toggleTheme}
                            isAnimationsEnabled={isAnimationsEnabled}
                            toggleAnimations={toggleAnimations}
                        />
                    </div>
                    <div className="pt-64 md:pt-[21rem]">
                        <Feed />
                    </div>
                </div>
            </div>
        </settingContext.Provider>
    )
}
