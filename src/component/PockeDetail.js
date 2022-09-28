import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link, useParams} from 'react-router-dom';


const PockeDetail = (props) => {

    
    const params = useParams();
    const getPockid = params.pokid;
    
    const [pokId, setPokId] = useState(getPockid);

    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);
    const [stats, setStats] = useState([]);
    const [pokImg, setPokImg] = useState();
    const [pokName, setPokName] = useState();
    const [pokHeight, setPokHeight] = useState();
    const [pokWeight, setPokWeight] = useState();
    

    const baseURL = `https://pokeapi.co/api/v2/pokemon/${pokId}`;

    useEffect(() => {
		fetchPokDetail();
	}, [pokId]);
    
    const fetchPokDetail = async () => {
		axios.get(baseURL).then((response) => {
            
            const getPockData = response.data;
            
            const pokImg = getPockData.sprites.other.dream_world.front_default;
            setPokImg(pokImg);
            setPokName(getPockData.name);
            setPokHeight(getPockData.height);
            setPokWeight(getPockData.weight);
            setAbilities(getPockData.abilities);
            setMoves(getPockData.moves);
            setStats(getPockData.stats);

        });
	}

    return(
        <>
            <section className='pokDetail-section mt-5'>
                <div className='container'>
                    
                    <div className='pokDetail-wrapper'>
                        <div className='row align-items-center'>
                            <div className='col-md-4'>
                                <div className='text-center'>
                                <img className='img-fluid' src={pokImg} />
                                </div>
                            </div>
                            <div className='col-md-8'>
                                <h3>{pokName}</h3>
                                <div className='mt-3'>
                                    <span>Height : {pokHeight}</span>
                                    <spa className="px-3">|</spa> 
                                    <span>Weight : {pokWeight}</span>
                                </div>
                                <div className='pokDetail-content mt-4'>
                                    <h4>Abilities</h4>
                                    <ul>
                                        {
                                            abilities.map((item, key) => {
                                                const {ability} = item;
                                                return(
                                                    <li id={key}>
                                                        <a target="_blank" href={ability.url}>{ability.name}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className='pokDetail-content mt-4'>
                                    <h4>Moves</h4>
                                    <ul>
                                        {
                                            moves.slice(0, 12).map((item, key) => {
                                                const {move} = item;
                                                return(
                                                    <li id={key}>
                                                        <a target="_blank" href={move.url}>{move.name}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className='pokDetail-content mt-4'>
                                    <h4>Stats</h4>
                                    <ul>
                                        {
                                            stats.map((item, key) => {
                                                const {stat} = item;
                                                return(
                                                    <li id={key}>
                                                        <a target="_blank" href={stat.url}>{stat.name}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <Link className='backBtn' to="/">Back</Link>
                </div>
            </section>
        </>
    )
}

export default PockeDetail;