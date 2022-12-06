import styled from "styled-components";

export const Page_Default = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    background: #f5f5f5;
`;

export const Page_Gradiant = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    background: linear-gradient(to right, rebeccapurple, salmon);
`;

export const Item_c = styled.div`
    margin :auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Item_l = styled.div`
    margin :auto;
    display: flex;
    justify-content: left;
    align-items: left;
`;

export const Item_r = styled.div`
    margin :auto;
    display: flex;
    justify-content: right;
    align-items: right;
`;

export const Item_t = styled.div`
    margin :auto;
    display: flex;
    justify-content: center;
    align-items: top;
`;

export const Item_b = styled.div`
    margin :auto;
    display: flex;
    justify-content: center;
    align-items: bottom;
`;

export const Page = styled.div`
    ${(props) => props.sx}
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    background: ${(props) => props.sx.bg};
    display:block;
    ${props => props.sx.bg === "default" && `
        background: #f5f5f5;
    `}
    ${props => props.sx.bg === "grad-right" && `
        background: linear-gradient(to right,${props.sx.grad1}, ${props.sx.grad2});
    `}
    ${props => props.sx.bg === "grad-left" && `
        background: linear-gradient(to left, ${props.sx.grad1}, ${props.sx.grad2});
    `}
    ${props => props.sx.bg === "grad-top" && `
        background: linear-gradient(to top, ${props.sx.grad1}, ${props.sx.grad2});
    `}
    ${props => props.sx.bg === "grad-bottom" && `
        background: linear-gradient(to bottom, ${props.sx.grad1}, ${props.sx.grad2});
    `}
`;

export const Content = styled.div`
    border: 1px solid blue;
    ${(props) => props.sx}
    @media (min-width: 768px) {
        max-width: 1920px;
        max-height: 1080px;
    }
    @media (min-width: 300px) and (max-width: 767px) {
        ${(props) => props.sm}
    }
`;

export const Item = styled.div`
    border: 1px solid red;
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

export const Btn = styled.div`
    background-color: #a84ba6;
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    margin: 0 10px;
    cursor: pointer;
    outline: none;
    color: #fff;
    &:hover {
        opacity: .5;
    }
    ${(props) => props.sx}
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
