import { SelectBox, RadioGroup } from "devextreme-react"

export const ASIDE_A0103000000 = () => {

    const searchSelect = ['All', 'EX']
    const searchUse = ['All', 'Y', 'N']
    const searchConfirm = ['All', 'P', 'Y', 'N']

    return (
        <div className="search-cate">
            
            <div className="sc-box">
                <h5 className="sc-tit">
                    Company
                </h5>

                <div className="sc-cont">
                    <SelectBox 
                        name="" 
                        id="" 
                        className="sc-select"
                        items={searchSelect}
                    />
                </div>
            </div>

            <div className="sc-box">
                <h5 className="sc-tit">
                    Factory
                </h5>

                <div className="sc-cont">
                    <SelectBox 
                        name="" 
                        id="" 
                        className="sc-select"
                        items={searchSelect}
                    />
                </div>
            </div>

            <div className="sc-box">
                <h5 className="sc-tit">
                    Plant
                </h5>

                <div className="sc-cont">
                    <SelectBox 
                        name="" 
                        id="" 
                        className="sc-select"
                        items={searchSelect}
                    />
                </div>
            </div>

            <div className="sc-box">
                <h5 className="sc-tit">
                    사용
                </h5>

                <div className="sc-cont">
                    <RadioGroup className="radio-group" items={searchUse} defaultValue={searchUse[0]} />
                </div>
            </div>

            <div className="sc-box">
                <h5 className="sc-tit">
                    확정
                </h5>

                <div className="sc-cont">
                    <RadioGroup className="radio-group" items={searchConfirm} defaultValue={searchConfirm[0]} />
                </div>
            </div>

        </div>
    )
}