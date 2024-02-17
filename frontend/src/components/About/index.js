import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition, Switch, Tab } from '@headlessui/react';
import { useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation';
import DogPark from './dogpark';
import GardenPolicy from './garden';
import cspMap from './csp-map.jpg';
import passyunk from './passyunk-map.jpeg'


// aboutView = ['doge', 'garden', 'art']

export default function About() {
    const { accessibilitySettings, headerFormat, subheaderFormat, contentFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { setPage } = useNavigation();

    const [aboutView, setAboutView] = useState('map')

    useEffect(() => {
        setPage('about')
    }, [])

    return (
        <div>
            <section className='mb-8'>
                <h1 className='text-3xl pb-3 mb-6 border-b border-gray-300'>About the Friends</h1>
                <p className='mb-4'>The Board comprises Park neighbors who have volunteered to be the leaders of Friends of Columbus Square, a not-for-profit organization dedicated to supporting our park with activities, care for its landscaping and cleaning, and to engage with the Philadelphia Parks and Recreation Department and the Columbus Square Advisory Committee.</p>
                <p className='mb-4'>The Board is led by Ross Richards as President and Executive Director, Brian Collins Treasurer, and Board Members Sarah Bryant, Steve Fabiani, and Brian Wenrich. We, along with the park’s many volunteers, have been working hard to reinvigorate Friends, establish relationships, and build an organizational foundation to meet our mission.</p>
                <img src={cspMap} className='mx-auto my-6' />
            </section>
            <section className='mb-8'>
                <h1 className='text-3xl pb-3 my-6 border-b border-gray-300'>History. Legacy. Prosperity.</h1>
                <h2 className='text-xl font-bold mb-3'>Nearly 150 years of fun</h2>
                <p className='mb-4'>Columbus Square Park has a century old history as colorful as it is long. Originally named Passyunk Square, it opened to the public in August, 1874.</p>
                <p className='mb-4'>The history of the park detailed below was prepared by Andrew Stober in September 2020, using a variety of resources including archives of the Philadelphia Inquirer.</p>
                <img src={passyunk} className='mx-auto my-6' />
                <h2 className='text-xl font-bold mb-3'>Comfort and Pleasure</h2>
                <p className='mb-4'>A public park named Passyunk Square, between Wharton and Reed Streets and 12th and 13th Streets, opened to the public in August 1874. The Philadelphia Inquirer heralded that, “this miniature park will add greatly to the improvement of property as well as to the comfort and pleasure of people in the southern portion of our city.” The park was known for its 250 trees and raised grass plots which gave its walks a bold and beautiful appearance.</p>
                <h2 className='text-xl font-bold mb-3'>More than a Century of Renovations</h2>
                <p className='mb-4'>Nearly three decades after opening, city officials appropriated $6,000 to “fit up Passyunk Square.” By 1919, the Inquirer’s editorial board was scolding the city government for its failure to properly maintain the park. While the trees remained, according to the editorial “all else is desolation.” In 2008 a new recreation center was constructed. In the mid-2010s an effort got underway for a major park renovation. With state, city, and philanthropic funding renovations commenced in late 2019.</p>
                <h2 className='text-xl font-bold mb-3'>Arts and Sports</h2>
                <p className='mb-4'>In 1898 it was reported that the City’s Municipal Band would play six of its summer concerts in the park. Throughout the 1960s and 1970s the park hosted opera and ballet performances. In the 21st Century the park served as a stage for Shakespeare in the Park performances. The park has long been the home to sports teams including youth and adult baseball and football teams from at least the turn of the 20th century. The park hosted bocci court for decades and was known for its championship winning marble player kids in the 1940s and 1950s.</p>
                <h2 className='text-xl font-bold mb-3'>A Place for Protest</h2>
                <p className='mb-4'>In 1933, in the midst of the Great Depression, a Communist and Ani-Facist Rally attracted 2,500 to the square to hear speeches. The rally was disrupted by khaki shirt Facist sympathizers. “An epidemic of fist fights broke out” and the police declared a riot. As the crowd dispersed a 48 year old man, Domenic Secca, was found stabbed. He later died at St. Agnes hospital. The same evening police arrested Primo Rossi after raiding the Communist headquarters at Tasker and 12th Street and charged him as a material witness to murder.</p>
                <p className='mb-4'>During a 2019 ground breaking ceremony, Native American Rights Activists protested calling for the name to be changed from Columbus Square. In 2020, in the midst of a national reckoning with the institutional racism and the mainstreaming of the Black Lives Matter movement, the park was the concluding point of a family march in support of Black Lives Matter. Hundreds of marches hung signs in support of racial justice on the construction fences that surrounded the park.</p>
                <h2 className='text-xl font-bold mb-3'>From Park to Playgound</h2>
                <p className='mb-4'>In 1940 the Playground Association, the Bureau of Recreation, and The Inquirer set a goal of creating 25 playgrounds in the city because “a study revealed that many were necessary to take care of the most needy children.” An Inquirer article from the time called out the Parent Teacher Associations of the James Wilson and Andrew Jackson Schools for their successful advocacy to have a playground built at Passyunk Square. Just a year later a plan was announced to turn the park into largely the park we know today, with a softball field, recreation building, lots of older and younger children, and a wading pool.</p>
                <h2 className='text-xl font-bold mb-3'>80 years as Passyunk Square, 70 as Columbus Square</h2>
                <p className='mb-4'>On October 13, 1954 the Passyunk Square was renamed Columbus Square at a ceremony attended by Mayor Tate, the Italian Consul General, and civic groups. It was believed to be the first public memorial to Columbus in Philadelphia. For at least 40 years the park was home to Columbus Day celebrations. Parades stepped off from the park and concluded first at Independence Hall and later the Columbus Statue in Marconi Plaza. In 1983, the park was officially renamed Columbus-DiProspero Playground, after Anthony DiProspero a long time community advocate who served as the recreation center leader for two decades, from about 1950 to 1970. The park has remained a center of neighborhood life for decades with the recreation center, playground, and ball fields hosting residents from the surrounding blocks and beyond for athletic, social, and civic activities.</p>
            </section>
        </div>
    )
}
