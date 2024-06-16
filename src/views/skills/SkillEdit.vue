<script setup>
    import useSkills from '@/composables/skills';
    import { onMounted } from 'vue';

    const { skill, getSkill, updateSkill, errors} = useSkills();

    const props = defineProps({
        id: {
            required: true,
            type: String
        }
    });

    onMounted(() => getSkill(props.id));
</script>
<template>
    <div class="m-12">
        <form class="max-w-md mx-auto p-4 bg-gray-900 showdow-md rounded-md" @submit.prevent="updateSkill(props.id)">
            <div class="space-y-6">
                <div class="mb-6">
                    <label for="name" class="block mb-2 text-sm font-medium text-black dark:text-white">Name</label>
                    <input 
                        type="text" 
                        id="name"
                        v-model="skill.name" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />

                    <div v-if="errors.name">
                        <span class="text-sm text-red-400">{{ errors.name[0] }}</span>
                    </div>
                </div>

                <div class="mb-6">
                    <label for="slug" class="block mb-2 text-sm font-medium text-black dark:text-white">Slug</label>
                    
                    <input 
                        type="text" 
                        id="slug" 
                        v-model="skill.slug"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />
                    
                    <div v-if="errors.slug">
                        <span class="text-sm text-red-400">{{ errors.slug[0] }}</span>
                    </div>
                </div>

                <div class="mt-4">
                    <button 
                        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>