import { describe, expect, it } from "vitest"
import { filterPublishedEducation } from "./education"
import type { EducationItem } from "@/src/lib/types"

const hiddenBasicComputer: EducationItem = {
    period: "2020",
    title: "Basic Computer ",
    institution: "Addbook Computer Centre",
    description: "Basic computer skills training, including Microsoft Office and internet usage.",
}

describe("filterPublishedEducation", () => {
    it("removes the old 2020 Basic Computer timeline entry", () => {
        expect(filterPublishedEducation([hiddenBasicComputer])).toEqual([])
    })

    it("keeps unrelated education records", () => {
        const cPlusPlus: EducationItem = {
            period: "2021",
            title: "Basic C++ Programming",
            institution: "ANT Technology Training Center",
            description: "Introduction to programming concepts using C++.",
        }

        expect(filterPublishedEducation([hiddenBasicComputer, cPlusPlus])).toEqual([cPlusPlus])
    })
})
