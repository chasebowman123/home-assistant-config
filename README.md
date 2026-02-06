# Home Assistant Configuration

[![Validation](https://github.com/chasebowman123/home-assistant-config/workflows/Home%20Assistant%20Configuration%20Validation/badge.svg)](https://github.com/chasebowman123/home-assistant-config/actions)

Home Assistant configuration repository with automations, integrations, and scripts. Version controlled and managed with Claude AI assistance and GitHub Actions CI/CD.

## 📚 Overview

This repository contains a fully version-controlled Home Assistant configuration that integrates with:
- **Claude AI** - for intelligent configuration assistance
- - **GitHub** - for version control and automation
  - - **GitHub Actions** - for CI/CD validation and backups
    - - **Home Assistant** - for smart home automation
     
      - ## 🏗️ Repository Structure
     
      - ```
        home-assistant-config/
        ├── .github/
        │   └── workflows/
        │       └── main.yml           # CI/CD workflow for validation & backups
        ├── configuration/
        │   ├── configuration.yaml     # Main HA configuration
        │   ├── automations.yaml       # Automation definitions
        │   ├── scripts.yaml           # Custom scripts
        │   ├── scenes.yaml            # Scene definitions
        │   └── customize.yaml         # Entity customization
        ├── .gitignore                 # Git ignore rules for HA
        └── README.md                  # This file
        ```

        ## 🚀 Quick Start

        ### 1. Clone the Repository
        ```bash
        git clone https://github.com/chasebowman123/home-assistant-config.git
        cd home-assistant-config
        ```

        ### 2. Copy Configuration to Home Assistant
        ```bash
        cp -r configuration/* ~/.homeassistant/
        ```

        ### 3. Restart Home Assistant
        Go to Settings → System → Restart

        ## 🤖 Claude + GitHub + Home Assistant Integration

        ### How It Works

        **Claude AI Role:**
        - Reviews your YAML configurations for syntax and best practices
        - - Suggests improvements and optimizations
          - - Helps debug configuration errors
            - - Explains automation logic
              - - Assists with new features and integrations
               
                - **GitHub Role:**
                - - Version control for all configurations
                  - - Change history and rollback capability
                    - - Collaborative editing via pull requests
                      - - Issue tracking for feature requests
                       
                        - **GitHub Actions Role:**
                        - - Automatically validates YAML syntax on every commit
                          - - Creates backups of your configuration
                            - - Sends notifications on validation failures
                              - - Runs on schedule for regular backups
                               
                                - ### Usage Examples
                               
                                - #### Ask Claude for Help
                                - 1. Push your configuration changes to GitHub
                                  2. 2. Ask Claude: "Review my Home Assistant automations in my GitHub repo and suggest improvements"
                                     3. 3. Claude analyzes the code and provides recommendations
                                        4. 4. Update your configurations based on feedback
                                           5. 5. Commit changes - GitHub Actions automatically validates them
                                             
                                              6. #### Create New Automations
                                              7. 1. Describe what you want: "Create an automation that turns on lights at sunset"
                                                 2. 2. Claude generates the YAML configuration
                                                    3. 3. Add it to `configuration/automations.yaml`
                                                       4. 4. Commit to GitHub
                                                          5. 5. GitHub Actions validates and backs up automatically
                                                            
                                                             6. #### Fix Configuration Issues
                                                             7. 1. Check the GitHub Actions workflow result
                                                                2. 2. Share the error with Claude: "My configuration has this error..."
                                                                   3. 3. Claude identifies the problem and suggests fixes
                                                                      4. 4. Apply fixes and commit
                                                                         5. 5. GitHub Actions confirms validation passes
                                                                           
                                                                            6. ## 🔧 Configuration Files
                                                                           
                                                                            7. ### configuration.yaml
                                                                            8. Main Home Assistant configuration file. Contains:
                                                                            9. - HTTP settings and CORS
                                                                               - - Frontend configuration
                                                                                 - - Logger settings
                                                                                   - - System health monitoring
                                                                                     - - Integration inclusions
                                                                                      
                                                                                       - ### automations.yaml
                                                                                       - Home Assistant automations. Example automations included:
                                                                                       - - Sunset-based lighting
                                                                                         - - Security notifications
                                                                                           - - Time-based triggers
                                                                                             - - Conditional actions
                                                                                              
                                                                                               - ### scripts.yaml
                                                                                               - Custom scripts for complex automations and routines.
                                                                                              
                                                                                               - ### scenes.yaml
                                                                                               - Pre-defined scenes for different home states (e.g., Movie Mode, Good Night, etc.)
                                                                                              
                                                                                               - ### customize.yaml
                                                                                               - Entity customization and friendly names.
                                                                                              
                                                                                               - ## 🔄 CI/CD Workflow
                                                                                              
                                                                                               - The GitHub Actions workflow (`.github/workflows/main.yml`) automatically:
                                                                                              
                                                                                               - 1. **Validates YAML Syntax** - Ensures all configuration files are valid
                                                                                                 2. 2. **Checks Python** - Sets up Python environment for HA components
                                                                                                    3. 3. **Creates Backups** - Zips configuration on successful commits
                                                                                                       4. 4. **Stores Artifacts** - Keeps 30 days of backup history
                                                                                                          5. 5. **Notifies on Failure** - Alerts if validation fails
                                                                                                            
                                                                                                             6. ### Workflow Triggers
                                                                                                             7. - Push to main branch (configuration/ or workflows/)
                                                                                                                - - Pull requests to main branch
                                                                                                                  - - Daily schedule at 2 AM UTC
                                                                                                                   
                                                                                                                    - ## 📊 Integration Points
                                                                                                                   
                                                                                                                    - ### Claude to GitHub
                                                                                                                    - Claude has access to this GitHub repository via the Anthropic GitHub App, allowing Claude to:
                                                                                                                    - - Read your configuration files
                                                                                                                      - - Suggest improvements
                                                                                                                        - - Explain your setup
                                                                                                                          - - Help with troubleshooting
                                                                                                                           
                                                                                                                            - ### GitHub to Home Assistant
                                                                                                                            - Manual sync options:
                                                                                                                            - 1. Use Home Assistant's file editor
                                                                                                                              2. 2. Use `git clone` to pull latest configs
                                                                                                                                 3. 3. Set up a webhook to trigger HA reloads
                                                                                                                                   
                                                                                                                                    4. ### GitHub Actions to Home Assistant
                                                                                                                                    5. For automated deployment:
                                                                                                                                    6. - Use GitHub Webhooks to trigger HA automations
                                                                                                                                       - - Create custom integrations for HA to pull configs
                                                                                                                                         - - Set up SSH deployments to Home Assistant instance
                                                                                                                                          
                                                                                                                                           - ## 🛠️ Setup Instructions
                                                                                                                                          
                                                                                                                                           - ### Prerequisites
                                                                                                                                           - - Home Assistant instance (Cloud, Supervised, or Docker)
                                                                                                                                             - - GitHub account
                                                                                                                                               - - Optional: Claude API key for direct integration
                                                                                                                                                
                                                                                                                                                 - ### Step 1: Clone This Repository
                                                                                                                                                 - ```bash
                                                                                                                                                   git clone https://github.com/chasebowman123/home-assistant-config
                                                                                                                                                   cd home-assistant-config
                                                                                                                                                   ```
                                                                                                                                                   
                                                                                                                                                   ### Step 2: Copy Configuration Files
                                                                                                                                                   ```bash
                                                                                                                                                   cp -r configuration/* ~/.homeassistant/
                                                                                                                                                   ```
                                                                                                                                                   
                                                                                                                                                   ### Step 3: Restart Home Assistant
                                                                                                                                                   Settings → System → Restart in the UI
                                                                                                                                                   
                                                                                                                                                   ### Step 4: Validate Configuration
                                                                                                                                                   Check the GitHub Actions tab to see if validation passed
                                                                                                                                                   
                                                                                                                                                   ### Step 5: Use Claude for Help
                                                                                                                                                   Ask Claude questions about your configuration!
                                                                                                                                                   
                                                                                                                                                   ## 🔐 Security Notes
                                                                                                                                                   
                                                                                                                                                   ⚠️ **Important:** Never commit:
                                                                                                                                                   - API keys or tokens
                                                                                                                                                   - - Passwords or secrets
                                                                                                                                                     - - Personal information
                                                                                                                                                       - - Sensitive IP addresses
                                                                                                                                                        
                                                                                                                                                         - Use Home Assistant's `!secret` syntax:
                                                                                                                                                         - ```yaml
                                                                                                                                                           weather:
                                                                                                                                                             - platform: openweathermap
                                                                                                                                                               api_key: !secret openweather_api_key
                                                                                                                                                           ```
                                                                                                                                                           
                                                                                                                                                           Store secrets in `secrets.yaml` (add to `.gitignore`)
                                                                                                                                                           
                                                                                                                                                           ## 📝 Best Practices
                                                                                                                                                           
                                                                                                                                                           1. **Use Meaningful Commit Messages**
                                                                                                                                                           2.    ```
                                                                                                                                                                    git commit -m "Add motion-sensor light automation for hallway"
                                                                                                                                                                    ```
                                                                                                                                                                 
                                                                                                                                                                 2. **Test Before Committing**
                                                                                                                                                                 3.    - Validate in Home Assistant UI first
                                                                                                                                                                       -    - Check configuration in Dev Tools
                                                                                                                                                                        
                                                                                                                                                                            - 3. **Use Pull Requests**
                                                                                                                                                                              4.    - Create branch for new features
                                                                                                                                                                                    -    - Get Claude's feedback via PR comments
                                                                                                                                                                                         -    - Merge after validation passes
                                                                                                                                                                                          
                                                                                                                                                                                              - 4. **Keep Backups**
                                                                                                                                                                                                5.    - GitHub Actions creates automatic backups
                                                                                                                                                                                                      -    - Download backup artifacts regularly
                                                                                                                                                                                                       
                                                                                                                                                                                                           - 5. **Document Changes**
                                                                                                                                                                                                             6.    - Update this README for significant changes
                                                                                                                                                                                                                   -    - Add comments in YAML for complex logic
                                                                                                                                                                                                                    
                                                                                                                                                                                                                        - ## 🐛 Troubleshooting
                                                                                                                                                                                                                    
                                                                                                                                                                                                                        - ### Validation Fails in GitHub Actions
                                                                                                                                                                                                                        - 1. Check the workflow run details
                                                                                                                                                                                                                          2. 2. Share error with Claude for help
                                                                                                                                                                                                                             3. 3. Fix the YAML syntax
                                                                                                                                                                                                                                4. 4. Commit the fix
                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                   5. ### Can't See Changes in Home Assistant
                                                                                                                                                                                                                                   6. 1. Ensure files are in correct location
                                                                                                                                                                                                                                      2. 2. Restart Home Assistant
                                                                                                                                                                                                                                         3. 3. Check Home Assistant logs for errors
                                                                                                                                                                                                                                            4. 4. Ask Claude to review your configuration
                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                               5. ### GitHub Actions Not Running
                                                                                                                                                                                                                                               6. 1. Check `.github/workflows/main.yml` exists
                                                                                                                                                                                                                                                  2. 2. Verify GitHub Actions is enabled in repo settings
                                                                                                                                                                                                                                                     3. 3. Check branch name is "main"
                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                        4. ## 📖 Resources
                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                        5. - [Home Assistant Documentation](https://www.home-assistant.io/docs/)
                                                                                                                                                                                                                                                           - - [YAML Syntax Guide](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)
                                                                                                                                                                                                                                                             - - [GitHub Actions Documentation](https://docs.github.com/en/actions)
                                                                                                                                                                                                                                                               - - [Claude Documentation](https://claude.ai/docs)
                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                 - ## 🤝 Contributing
                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                 - To improve this configuration:
                                                                                                                                                                                                                                                                 - 1. Create a new branch
                                                                                                                                                                                                                                                                   2. 2. Make changes
                                                                                                                                                                                                                                                                      3. 3. Push to GitHub
                                                                                                                                                                                                                                                                         4. 4. Create a Pull Request
                                                                                                                                                                                                                                                                            5. 5. GitHub Actions validates automatically
                                                                                                                                                                                                                                                                               6. 6. Merge after approval
                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                  7. ## 📄 License
                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                  8. MIT License - See LICENSE file for details
                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                  9. ## 🎯 Future Enhancements
                                                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                                  10. - [ ] Add more example automations
                                                                                                                                                                                                                                                                                      - [ ] - [ ] Create Home Assistant add-on for Git sync
                                                                                                                                                                                                                                                                                      - [ ] - [ ] Add webhook integration for real-time syncing
                                                                                                                                                                                                                                                                                      - [ ] - [ ] Create Discord/Slack notifications for validation
                                                                                                                                                                                                                                                                                      - [ ] - [ ] Add more detailed integration examples
                                                                                                                                                                                                                                                                                      - [ ] - [ ] Create video tutorials
                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                      - [ ] ## 📞 Support
                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                      - [ ] For help with this setup:
                                                                                                                                                                                                                                                                                      - [ ] 1. Ask Claude directly about your configuration
                                                                                                                                                                                                                                                                                      - [ ] 2. Check GitHub Issues for common problems
                                                                                                                                                                                                                                                                                      - [ ] 3. Review Home Assistant official documentation
                                                                                                                                                                                                                                                                                      - [ ] 4. Check GitHub Actions logs for validation errors
                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                      - [ ] ---
                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                      - [ ] **Last Updated:** 2026-06-02
                                                                                                                                                                                                                                                                                      - [ ] **Maintained By:** Claude AI + You
                                                                                                                                                                                                                                                                                      - [ ] **Status:** ✅ Active & Validated
