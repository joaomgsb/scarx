import React from 'react';

const stats = [
	{
		title: '31%',
		description:
			'dos adultos estão insuficientemente ativos — ~1,8 bi não alcançam as metas semanais de atividade física segundo a OMS.',
		image: 'images/betterme/insuficiente.jpg',
		alt: 'Pessoa sedentária olhando pela janela',
	},
	{
		title: '66%',
		description:
			'menos risco de lesões esportivas com programas de treino de força bem orientados e progressão adequada.',
		image: 'images/betterme/treinoforca.png',
		alt: 'Homem alongando após treino de força',
	},
	{
		title: '10–20%',
		description:
			'de redução no risco de morte, doenças cardiovasculares e câncer com 30–60 min/semana de musculação.',
		image: 'images/betterme/musculacao.jpg',
		alt: 'Pessoa treinando musculação',
	},
];

const BetterMeStats: React.FC = () => {
	return (
		<section className="section-padding section-transition">
			<div className="container-custom">
				<h2 className="text-primary mb-8 md:mb-12 max-w-4xl text-center mx-auto">
					Dados que viram performance
				</h2>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{stats.map((item, index) => (
						<article
							key={index}
							className="card glass-effect rounded-3xl overflow-hidden flex flex-col h-full">
							<div className="p-6 sm:p-8">
								<p className="text-6xl md:text-7xl font-display font-medium text-primary mb-4">
									{item.title}
								</p>
								<p className="text-base md:text-lg text-white">
									{item.description}
								</p>
							</div>

							{/* Imagem apenas no desktop (>= lg) */}
							<div className="hidden lg:block mt-auto">
								<img
									src={item.image}
									alt={item.alt}
									className="w-full h-56 object-cover block"
								/>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default BetterMeStats; 