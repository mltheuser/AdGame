export default function GameProgress(props: any) {


    return (
        <div>
            {props.progress.map((val: number, index: number) => {
                if (val < 0) {
                    return (
                        <span key={index} className="progressDot"></span>
                    );
                }
                if (val > 0) {
                    return (
                        <span key={index} className="progressDot DotWon"></span>
                    );
                }
                return (
                    <span key={index} className="progressDot DotLost"></span>
                );
            })}
        </div>
    )
}