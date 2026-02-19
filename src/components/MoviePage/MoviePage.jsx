import styles from './MoviePage.module.css';
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import MovieItem from "../MovieList/MovieItem.jsx";
const apiKey = import.meta.env.VITE_API_KEY;

function MoviePage() {

    const {slug} = useParams();
    const movieId = slug.split("-")[0].trim();
    const [movie, setMovies] = useState([]);
    const [trailer, setTrailer] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTExNWI4NGY2MzVhMGUwMDc2NTNlZDkzODI2MjE0YyIsIm5iZiI6MTc2OTU0MjE5NS4xOSwic3ViIjoiNjk3OTEyMzMzYzE0MThjYThhMDI5MGY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cf25GP7bO__UzQ5LSLT64UX5QsIt8Dyz4BTa1oaPuT4'
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/1272837/videos?api_key='+{apiKey}+'&language=ru-RU', options)
            .then(res => res.json())
            .then(res => {
                console.log(res.results[0].key);
                setTrailer(res.results[0]);
            })
            .catch(err => console.error(err));
        fetch('https://api.themoviedb.org/3/movie/'+movieId, options)
            .then(res => res.json())
            .then(res => {
                setMovies(res);

            })
            .catch(err => console.error(err));
    }, []);


    return (<div className={styles.moviePage}>
            <div className="bg-blue-500 text-white p-6 rounded-xl text-2xl">
                Tailwind должен работать!
            </div>
            <div className="header large border first bg-white text-gray-900 relative overflow-hidden">
                <div className="keyboard_s custom_bg absolute inset-0">
                    {/* Лёгкий градиент + blurred backdrop для светлой темы */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white/90 to-white opacity-90"
                    ></div>
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-110"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path})`,
                        }}
                    ></div>
                </div>

                <div className="single_column relative z-10 max-w-7xl mx-auto px-4 py-12">
                    <section id="original_header" className="images inner flex flex-col md:flex-row gap-10">
                        {/* Постер */}
                        <div className="poster_wrapper w-full md:w-1/3 flex-shrink-0">
                            <div className="poster relative rounded-2xl overflow-hidden shadow-2xl group border border-gray-200">
                                <div className="image_content">
                                    {trailer?.key && (
                                        <a
                                            href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                        >
                                            <span className="text-7xl text-white drop-shadow-lg">▶</span>
                                        </a>
                                    )}

                                    <div
                                        className="blurred absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-60"
                                        style={{
                                            backgroundImage: `ur[](https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                                        }}
                                    ></div>

                                    <img
                                        className="poster w-full object-cover relative z-10"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title || "Poster"}
                                    />
                                </div>
                            </div>

                            <div className="zoom mt-4 text-center md:text-left">
                                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center md:justify-start gap-1 font-medium">
                                    <span className="text-xl">⛶</span> Расширить
                                </a>
                            </div>
                        </div>

                        <div className="header_poster_wrapper flex-1">
                            <section className="header poster space-y-6">
                                <div className="title">
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                                        <a href="/movie/1272837-28-years-later-the-bone-temple" className="hover:text-blue-600 transition-colors">
                                            28 лет спустя: Храм костей
                                        </a>
                                        <span className="tag release_date text-2xl text-gray-600 ml-3">(2026)</span>
                                    </h2>

                                    <div className="facts flex flex-wrap gap-4 mt-4 text-gray-700 text-sm font-medium">
                                        <span className="certification bg-red-600 text-white px-3 py-1 rounded-md">18+</span>
                                        <span className="release">15.01.2026 (UA)</span>
                                        <span className="genres">
                                            <a href="/genre/27-horror/movie" className="hover:text-blue-600">ужасы</a>,{" "}
                                            <a href="/genre/53-thriller/movie" className="hover:text-blue-600">триллер</a>,{" "}
                                            <a href="/genre/878-science-fiction/movie" className="hover:text-blue-600">фантастика</a>
                                        </span>
                                        <span className="runtime">1 ч 49 мин</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                                    <div className="flex items-center gap-5">
                                        <div className="chart relative w-20 h-20">
                                            <div
                                                className="absolute inset-0 rounded-full shadow-inner"
                                                style={{
                                                    background: `conic-gradient(#01b4e4 ${73 * 3.6}deg, #e5e7eb 0deg)`,
                                                }}
                                            ></div>
                                            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-gray-800 shadow-md">
                                                3<span className="text-lg align-super">%</span>
                                            </div>
                                        </div>
                                        <div className="font-bold text-xl text-gray-800">Рейтинг</div>
                                    </div>

                                    <div className="group flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-full cursor-pointer transition border border-gray-300">
                                      <span className="font-semibold text-gray-800">
                                        What's your <span className="underline decoration-blue-500 decoration-2">Vibe</span>?
                                      </span>
                                      <span className="text-gray-500 text-lg">ℹ</span>
                                    </div>
                                </div>

                                <div className="header_info space-y-5">
                                    <h3 className="tagline text-2xl italic text-gray-600 font-medium">
                                        «Страх — это новая вера»
                                    </h3>

                                    <h3 className="text-3xl font-semibold text-gray-900">Обзор</h3>
                                    <div className="overview text-gray-800 leading-relaxed text-lg">
                                        <p>
                                            Доктор Келсон вступает в опасный союз, который может перекроить будущее человечества. Тем временем Спайк попадает в ловушку Джимми Кристала и превращает собственную жизнь в кошмар, из которого нет выхода. Но настоящая угроза — не заражённые. Самые страшные монстры уже среди выживших, и их жестокость страшнее любого вируса.
                                        </p>
                                    </div>

                                    <ol className="people no_image flex flex-wrap gap-8 mt-6">
                                        <li className="profile">
                                            <p className="font-semibold text-gray-900">
                                                <a href="/person/1795072-nia-dacosta" className="hover:text-blue-600">Ниа ДаКоста</a>
                                            </p>
                                            <p className="text-gray-600 text-sm">Director</p>
                                        </li>
                                        <li className="profile">
                                            <p className="font-semibold text-gray-900">
                                                <a href="/person/2036-alex-garland" className="hover:text-blue-600">Алекс Гарленд</a>
                                            </p>
                                            <p className="text-gray-600 text-sm">Writer</p>
                                        </li>
                                    </ol>
                                </div>
                            </section>
                        </div>
                    </section>

                    <div id="ott_offers_window" className="hidden"></div>
                </div>
            </div>
        </div>
        )

        }

        export default MoviePage