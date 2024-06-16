import {ref} from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

// the url "rest-api" points to localhost, set in host file.
const baseURL = "http://rest-api/api/v1/skills";

export default function useSkills() {
    
    const skills = ref([]);
    const skill = ref([]);
    const errors = ref([]);
    const router = useRouter();

    const getSkills = async () => {
        const response = await axios.get(baseURL);

        skills.value = response.data.data;
    };

    const getSkill = async (id) => {
        const response = await axios.get(baseURL + "/" + id);

        skill.value = response.data.data;
    };

    const storeSkill = async (skill) => {
        try {
            await axios.post(baseURL, skill);

            router.push({name: "SkillIndex"});
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const updateSkill = async (id) => {
        try {
            await axios.put(baseURL + "/" + id, skill.value);

            await router.push({ name: "SkillIndex" });
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const destroySkill = async (id) => {
        if (! window.confirm("Are you sure?")) {
            return;
        }

        await axios.delete(baseURL + "/" + id);
        await getSkills();
    }
    
    return {
        skill,
        skills,
        getSkill,
        getSkills,
        storeSkill,
        updateSkill,
        destroySkill,
        errors,
    };
}