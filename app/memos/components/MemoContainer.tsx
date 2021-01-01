import * as React from "react"
import { useRouter } from "next/router"

const MemoContainer: React.FC = ({ children }) => {
  return (
    <div className="container mx-auto">
      <section className="py-12 px-4 text-center">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="mt-2 mb-6 font-semibold font-heading leading-tight text-3xl">
            Make notes
          </h2>
        </div>
      </section>
      {children}
    </div>
  )
}

export default MemoContainer
