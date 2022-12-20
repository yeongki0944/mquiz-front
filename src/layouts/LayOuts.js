import styled from "styled-components";


export const Page = styled.div`
    ${(props) => props.sx}
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    display:block;
    background: ${(props) => props.sx.bg === "img" ? `url(${props.sx.img}) no-repeat center center fixed` : `#f5f5f5`};
    background-size: cover;
`;

export const Content = styled.div`
    // border: 3px solid blue;
    margin: auto;
    ${(props) => props.sx}
    @media (min-width: 768px) {
        max-width: 1920px;
    }
    @media (min-width: 300px) and (max-width: 767px) {
        ${(props) => props.sm}
    }
`;

export const Item = styled.div`
    // border: 1px solid red;
    display:flex;
    width:100%;
    height:100%;
    ${(props) => props.sx};
    ${(props) => props.sx.place === "center" && "justify-content: center; align-items: center;"}
    ${(props) => props.sx.place === "left" && "justify-content: left; align-items: left;"}
    ${(props) => props.sx.place === "right" && "justify-content: right; align-items: right;"}
    ${(props) => props.sx.place === "top" && "justify-content: center; align-items: top;"}
    ${(props) => props.sx.place === "top-left" && "justify-content: left; align-items: top;"}
    ${(props) => props.sx.place === "top-right" && "justify-content: right; align-items: top;"}
    ${(props) => props.sx.place === "bottom" && "justify-content: center; align-items: bottom;"}
    ${(props) => props.sx.place === "bottom-left" && "justify-content: left; align-items: bottom;"}
    ${(props) => props.sx.place === "bottom-right" && "justify-content: right; align-items: bottom;"}
    
    @media (min-width: 300px) and (max-width: 767px) {
        ${(props) => props.sm} 
    }
`;

export const Text = styled.div`
    fontWeight:'bold';
    ${(props) => props.sx}
    justify-content: center;
    align-items: center;
    text-align: center;
    @media (min-width: 768px) {
    }
    @media (min-width: 300px) and (max-width: 767px) {
        ${(props) => props.sm}
    }
`

export const Card = styled.div`
    font-family: 'Jazz LET', fantasy;
    background: rgba(0,0,0,0.5);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.05);
        background: rgba(0,0,0,0.7);
        color: #fff;
    }
    ${(props) => props.sx}
    @media (min-width: 768px) {
    }
    @media (min-width: 300px) and (max-width: 767px) {
        ${(props) => props.sm}
    }
`

export const Card_panel = styled.div`
    font-family: 'Jazz LET', fantasy;
    background: rgba(255,255,255,0.7);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    transition: all 0.3s ease-in-out;
    ${(props) => props.sx}
    @media (min-width: 768px) {
    }
    @media (min-width: 300px) and (max-width: 767px) {
        ${(props) => props.sm}
    }
`


export const Img = styled.img`
    ${(props) => props.sx}
    @media (min-width: 768px) {
    }
    @media (min-width: 300px) and (max-width: 767px) {
        ${(props) => props.sm}
    }
`

export const Btn = styled.div`
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    align-text: center;
    background: #FF4C29;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.3),
    7px 7px 20px 0px rgba(0,0,0,.5),
    4px 4px 5px 0px rgba(0,0,0,.3);
    outline: none;
    &:hover {
        opacity: .5;
    }
    ${(props) => props.sx}
    @media (min-width: 300px) and (max-width: 767px) {
        ${(props) => props.sm} 
    }
`;
