import React, { Component } from 'react'
import axios from 'axios';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			characters: [],
			stats: [],
			characterId: ''
		}
		this.getMainPage = this.getMainPage.bind(this);
		this.getSinglePage = this.getSinglePage.bind(this);
	}
	async componentDidMount() {
		const characters = (await axios.get('/api/characters')).data;
		this.setState({ characters });
		const loadStats = async()=> {
			const characterId = window.location.hash.slice(1) * 1;
			const stats = (await axios.get(`/api/characters/${characterId}/stats`)).data;
			this.setState({ stats, characterId,});
		};
		window.addEventListener('hashchange', async()=> {
			loadStats();
		});
		if(window.location.hash.slice(1)){
			loadStats();
		}
	}
	getMainPage() {
		return (
			<div id='main'>
				<h1 className='title'>The Seven Deadly Sins</h1>
				<div className='sins'>
					{
						this.state.characters.map(character => {
							return (
								<div>
									<img className={'characterImage'} src={character.imageURL} alt={character.name}/>
									<a className={'characterName'} href={ `#${character.id}` }>
										{character.name}
									</a>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
	getSinglePage() {
		const [sin] = this.state.stats.filter(sin => this.state.characterId === sin.characterId)
		return (
			<div id='single'>
				<a href={''}>back</a>
				<h1 className='title'>{sin.character.name}</h1>
				<img className={'characterImage'} src={sin.character.imageURL} alt={sin.character.name}/>
				<h3 className='subtitle'>The {sin.name}'s Sin of {sin.sin}</h3>
				<div className='stats'>
					<div>Race: {sin.race}</div>
					<div>Power Level: {sin.power}</div>
					<div>Ability: {sin.ability}</div>
					<div>Sacred treasure: {sin.treasure}</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div>
				{this.state.characterId ? this.getSinglePage() : this.getMainPage()}
			</div>
		)
	}
}

