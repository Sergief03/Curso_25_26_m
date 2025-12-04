
export default function createClimateApp() {
    const container=document.createElement('div');
    container.className='';

    const header=document.createElement('header');
    header.className='';

    const main=document.createElement('main');
    main.className='';

    const footer=document.createElement('footer');
    footer.className='';

    //funcionalidades

    const searchCard=createSearchCard(callback);

    container.append(header,main,footer);

    return container;

}
