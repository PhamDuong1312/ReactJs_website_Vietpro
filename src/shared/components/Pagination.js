import { Link,useLocation,useSearchParams } from "react-router-dom";
const Pagination = ({ pages }) => {
    const {pathname} = useLocation();
    const [searchParams,setUserSearchParams] = useSearchParams();
    const {limit, total,currentPage,next,prev,hasNext, hasPrev } = pages
    const renderPages=(delta=2)=>{
        const pagesHtml=[];
        const lastpages=Math.ceil(total/limit);
        const left=currentPage-delta
        const right=currentPage+delta
        for(let i=1; i<=lastpages; i++){
            if(i===1||i===currentPage||i===lastpages||(i>=left && i<=right))
                pagesHtml.push(i);
            else if(i===left-1 || i==right+1)
                pagesHtml.push("...")

            
        }
        return pagesHtml;
    }
    const formatUrl=(page)=>{
        return `${pathname}${searchParams.get("keyword")===null?"?":`?keyword=${searchParams.get("keyword")}&`}page=${page}`
    }
    return (
        <>
            <ul className="pagination">
                {hasPrev&&
                <li className="page-item"><Link className="page-link" to={formatUrl(prev)}>Trang trước</Link></li>}
                {renderPages().map((page)=>
                page==="..."?<li className={`page-item }`}><span className="page-link" >{page}</span></li>:
                <li className={`page-item ${page===currentPage&&"active"}`}><Link className="page-link" to={formatUrl(page)}>{page}</Link></li>
                )}                
                
                {hasNext&&<li className="page-item"><Link className="page-link" to={formatUrl(next)}>Trang sau</Link></li>}
            </ul>
        </>
    )
}
export default Pagination;