import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PockeDetail from './PockeDetail';

const Pocke = () => {

    const [pocke, setPocke] = useState([]);
    const pokLimit = 20;
    const [pageNo, setPageNo] = useState(1);
	const [pages, setPages] = useState([]);
	const [pagination, setPagination] = useState([]);

    const baseURL = `https://pokeapi.co/api/v2/pokemon?limit=${pokLimit}&offset=${pageNo}`

    useEffect(() => {
		fetchPoks();
        getPagination();
	}, [pages, pageNo]);

    const fetchPoks = async () => {
		axios.get(baseURL).then((response) => {
            setPages(response.data.count / 20);
            console.log(pages);
            const result = response.data.results;            
            setPocke(result);
        });
	}

    function getPagination(){
        const makePagArray = []
        for(let i = 1; i <= pages; i++){
            makePagArray.push(i)
        }
        setPagination(makePagArray);
    }

    const getPage = (element, item) => {
		let pno = element;
        
		setPageNo(pno);
	}

    const nextPage = (element) => {
		if(pageNo < 10){
            let getCurPage = pageNo + 1;
            console.log(getCurPage);
		    setPageNo(getCurPage);
        }
	}

	return (
		<>
			<section className='pocke-section'>
				<div className='container'>
					<div className="row">
                        <div className='pok-wrapper'>
                            <div className='row g-4'>
                                {
                                    pocke.map((item, key) => {
                                        const {name, url} = item;
                                        const getPok = url.split('/');
                                        const getPokId = getPok[getPok.length - 2]
                                        return(
                                            <div id={key} className='col-md-3'>
                                                <Link to={`/pockdetail/${getPokId}`} href='#' className='pockWrap text-center'>
                                                    <figure>
                                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getPokId}.svg`} />
                                                    </figure>
                                                    <h3>{name}</h3>
                                                    <p>#{getPokId}</p>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='pock-pagination mt-5'>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    {
                                        pagination.slice(0, 10).map((item, key) => {
                                            return(
                                                <li className="page-item">
                                                    <a onClick={(element) => getPage(item)} className="page-link" href="#">{item}</a>
                                                </li>
                                            )
                                        })
                                    }
                                    <li class="page-item"><a onClick={()=>nextPage()} class="page-link  nextPageLink" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Pocke
