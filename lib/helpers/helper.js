const setCharAt = (str,index,chr) => {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

module.exports = {
    formatProjectName: (projectName) => {
        let formatedProjectName = projectName;
        let counter = 0;
        for(let i = 0; i < projectName.length; i++){
            if(isNaN(projectName.charAt(i)) && projectName.charAt(i) != "-"){
                if(i != 0 && (projectName.charAt(i) == projectName.charAt(i).toUpperCase())){
                    if(counter > 0){ formatedProjectName = setCharAt(formatedProjectName, i+1, `-${formatedProjectName.charAt(i+1).toLowerCase()}`); }
                    else { 
                        formatedProjectName = setCharAt(projectName, i, `-${projectName.charAt(i).toLowerCase()}`);
                        counter++;
                    }
                }
            }
        }
        if(formatedProjectName.charAt(0) == formatedProjectName.charAt(0).toUpperCase()){
            formatedProjectName = setCharAt(formatedProjectName, 0, formatedProjectName.charAt(0).toLowerCase());;
        }
        return formatedProjectName;
    },
    formatComponentName: (componentName) => {
        let formatedComponentName = componentName;
        let counter = 0;
        for(let i = 0; i < componentName.length; i++){
            if(isNaN(componentName.charAt(i)) && componentName.charAt(i) != "-"){
                if(i != 0 && (componentName.charAt(i) == componentName.charAt(i).toUpperCase())){
                    if(counter > 0){ formatedComponentName = setCharAt(formatedComponentName, i+1, `-${formatedComponentName.charAt(i+1).toLowerCase()}`); }
                    else { 
                        formatedComponentName = setCharAt(componentName, i, `-${componentName.charAt(i).toLowerCase()}`);
                        counter++;
                    }
                }
            }
        }
        if(formatedComponentName.charAt(0) == formatedComponentName.charAt(0).toUpperCase()){
            formatedComponentName = setCharAt(formatedComponentName, 0, formatedComponentName.charAt(0).toLowerCase());;
        }
        return formatedComponentName;
    }
}