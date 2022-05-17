export const steps = [
    {
        id: 1,
        title: 'Community Details'
    },
    {
        id: 2,
        title: 'User Onboarding'
    },
    {
        id: 3,
        title: 'Access Rules'  
    }
]

export const goForward = (activeStep:any, setActiveStep:any, navigate:any) => {
    if (activeStep < 3) { 
        setActiveStep(activeStep + 1)
    }else{
        navigate('/dashboard')
    } 
}
export const goBack = (activeStep:any, setActiveStep:any) => {
    if (activeStep > 1) setActiveStep(activeStep - 1)
}
