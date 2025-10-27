import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TeamSlide = {
	id: string;
	name: string;
	role: string;
	avatar: string;
	quote: string;
	chat: {
		top: string;
		bottom: string;
	};
};

const slides: TeamSlide[] = [
	{
		id: 'joao',
		name: 'João Scar',
		role: 'Fundador & Metodologista',
		avatar: 'images/scarterno2.jpeg',
		quote:
			'Estamos aqui para transformar hábitos em resultados consistentes, com método e evolução contínua.',
		chat: {
			top: '',
			bottom: 'Seu progresso está incrível. Lembre-se: cada pequeno passo conta. 💪🎉',
		},
	},
	{
		id: 'gabriela',
		name: 'Gabriela Trindade',
		role: 'Nutricionista Esportiva',
		avatar: 'images/Gabriela.jpeg',
		quote:
			'Alimentação inteligente não é restrição, é estratégia: ajuste de macros para turbinar sua performance.',
		chat: {
			top: 'Fugi da dieta e comi fast food 😕',
			bottom: 'Sem drama. Hoje já voltamos ao plano com um prato equilibrado. Uma refeição não define sua semana.',
		},
	},
	{
		id: 'luiz',
		name: 'Luiz Camargo',
		role: 'Responsável Técnico',
		avatar: 'images/Luiz.jpeg',
		quote:
			'Treinamos com segurança e progressão. Técnica sólida e cargas bem dosadas trazem longevidade no treino.',
		chat: {
			top: 'Joelho pegando no agacho.',
			bottom: 'Hoje troca por box squat leve, foco em técnica. Te mando rotina de glúteo médio.',
		},
	},
	{
		id: 'daniel',
		name: 'Daniel França',
		role: 'Especialista em Emagrecimento',
		avatar: 'images/daniel.jpeg',
		quote:
			'Emagrecimento sustentável é aderência: pequenos ajustes, grandes ganhos, semana após semana.',
		chat: {
			top: '',
			bottom: 'Ei! Parabéns — ótimo trabalho por perder 1kg na semana passada! 💪🎉',
		},
	},
];

const slideVariants = {
	enter: { opacity: 0, y: 20 },
	center: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

const bubbleVariants = {
	hidden: { opacity: 0, y: 10, scale: 0.98 },
	show: { opacity: 1, y: 0, scale: 1 },
};

const BetterMeTeam: React.FC = () => {
	const [index, setIndex] = useState(0);
	const current = useMemo(() => slides[index], [index]);

	const next = () => setIndex((i) => (i + 1) % slides.length);
	const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

	return (
		<section className="section-padding section-transition">
			<div className="mx-auto w-full max-w-none px-4 sm:px-0">
				<div className="mb-8 md:mb-12 max-w-3xl mx-auto text-center">
					<h2 className="text-primary">Encontre sua equipe perfeita</h2>
					<p className="mt-3 text-lg md:text-xl lg:text-2xl text-white">
						Suporte no dia a dia por especialistas certificados para acelerar seus resultados.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch px-0 sm:pl-6 lg:pl-8">
					{/* Carrossel (esquerda) */}
					<div className="lg:col-span-7">
						<div className="card glass-effect rounded-3xl p-6 sm:p-8 h-full flex flex-col">
							<div className="text-5xl md:text-6xl text-light/60 mb-6">“”</div>
							<div className="flex-1 min-h-[140px]">
								<AnimatePresence mode="wait">
									<motion.p
										key={current.id}
										variants={slideVariants}
										initial="enter"
										animate="center"
										exit="exit"
										transition={{ duration: 0.35 }}
										className="text-xl md:text-2xl leading-relaxed text-light">
											{current.quote}
										</motion.p>
								</AnimatePresence>
							</div>

							<div className="mt-8 flex items-center justify-between gap-4">
								<div className="flex items-center gap-4">
									<img src={current.avatar} alt={current.name} className="w-16 h-16 rounded-2xl object-cover" />
									<div>
										<p className="text-lg text-light font-medium">{current.name}</p>
										<p className="text-light-muted">{current.role}</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<button aria-label="Anterior" onClick={prev} className="w-12 h-12 rounded-full bg-dark-accent border border-neutral-800 hover:border-primary/40 grid place-items-center transition-colors">
										<ChevronLeft className="text-light" />
									</button>
									<button aria-label="Próximo" onClick={next} className="w-12 h-12 rounded-full bg-dark-accent border border-neutral-800 hover:border-primary/40 grid place-items-center transition-colors">
										<ChevronRight className="text-light" />
									</button>
																</div>
							</div>
						</div>
					</div>
					{/* Imagem e balões (direita - desktop) */}
					<div className="hidden lg:block lg:col-span-5">
						<div className="relative h-full">
							<img
								src={'images/betterme/mulhercelular.jpg'}
								alt="Coach sorrindo usando celular"
								className="w-full h-full object-cover rounded-3xl"
							/>

							{/* Balão superior (vermelho) */}
							{current.chat.top && (
								<AnimatePresence mode="wait">
									<motion.div
										key={`top-${current.id}`}
										variants={bubbleVariants}
										initial="hidden"
										animate="show"
										exit="hidden"
										transition={{ duration: 0.35, delay: 0.05 }}
										className="absolute right-6 lg:right-10 xl:right-16 top-[50%] xl:top-[44%] 2xl:top-[60%] max-w-xs xl:max-w-sm rounded-2xl px-5 py-4 text-sm bg-[#3498DB] text-white shadow-xl z-20">
											{current.chat.top}
											<span className="absolute -right-3 bottom-4 w-3 h-3 bg-[#3498DB] rounded-full"></span>
										</motion.div>
								</AnimatePresence>
							)}

							{/* Balão inferior (branco) */}
							<AnimatePresence mode="wait">
								<motion.div
									key={`bottom-${current.id}`}
									variants={bubbleVariants}
									initial="hidden"
									animate="show"
									exit="hidden"
									transition={{ duration: 0.35, delay: 0.25 }}
									className="absolute left-6 xl:left-10 bottom-[6%] xl:bottom-[10%] max-w-sm xl:max-w-sm 2xl:max-w-md rounded-2xl px-5 py-4 text-sm bg-white text-dark shadow-xl z-10">
										{current.chat.bottom}
										<span className="absolute -left-3 bottom-4 w-3 h-3 bg-white rounded-full border border-neutral-200"></span>
									</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BetterMeTeam; 