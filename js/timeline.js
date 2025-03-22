/**
 * Interactive Student Debt Timeline
 * 
 * A visual chronological representation of key events in the history
 * of student loans in America from 1940s to present day.
 */

class StudentDebtTimeline {
    constructor(options) {
        this.containerId = options.containerId || 'timelineContainer';
        this.dataUrl = options.dataUrl || 'js/timeline-data.json';
        this.events = [];
        this.activeFilters = {
            legislation: true,
            economic: true,
            institutional: true
        };
        this.container = document.getElementById(this.containerId);
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.render();
            this.setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize timeline:', error);
            this.displayError();
        }
    }

    async loadData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.events = data.events;
            this.events.sort((a, b) => a.year - b.year);
        } catch (error) {
            console.error("Error loading timeline data:", error);
            this.displayError();
        }
    }

    render() {
        if (!this.container) return;
        
        // Clear previous content
        this.container.innerHTML = '';
        
        // Create the timeline header with filters
        const header = document.createElement('div');
        header.className = 'timeline-header';
        header.innerHTML = `
            <h2>Interactive Student Debt Timeline</h2>
            <div class="timeline-filters">
                <label>
                    <input type="checkbox" data-filter="legislation" ${this.activeFilters.legislation ? 'checked' : ''}> 
                    <span class="filter-color legislation"></span> Policy & Legislation
                </label>
                <label>
                    <input type="checkbox" data-filter="economic" ${this.activeFilters.economic ? 'checked' : ''}> 
                    <span class="filter-color economic"></span> Economic Impacts
                </label>
                <label>
                    <input type="checkbox" data-filter="institutional" ${this.activeFilters.institutional ? 'checked' : ''}> 
                    <span class="filter-color institutional"></span> Institutional Changes
                </label>
            </div>
        `;
        this.container.appendChild(header);
        
        // Create the main timeline
        const timelineEl = document.createElement('div');
        timelineEl.className = 'timeline-wrapper';
        
        // Create the timeline line
        const line = document.createElement('div');
        line.className = 'timeline-line';
        timelineEl.appendChild(line);
        
        // Add decade markers
        const startDecade = Math.floor(this.events[0].year / 10) * 10;
        const endDecade = Math.ceil(this.events[this.events.length-1].year / 10) * 10;
        
        for (let decade = startDecade; decade <= endDecade; decade += 10) {
            const marker = document.createElement('div');
            marker.className = 'decade-marker';
            marker.innerHTML = `<span>${decade}s</span>`;
            marker.style.left = `${this.calculatePosition(decade)}%`;
            timelineEl.appendChild(marker);
        }
        
        // First calculate how many events will be above/below to better distribute them
        let eventsToShow = this.events.filter(event => this.activeFilters[event.type]);
        let aboveCount = 0;
        let belowCount = 0;
        
        // Pre-determine positions to avoid overlapping
        eventsToShow.forEach((event, index) => {
            // Alternate more intelligently based on index
            if (index % 2 === 0) {
                aboveCount++;
            } else {
                belowCount++;
            }
        });
        
        // Add events to timeline
        let currentAbove = 0;
        let currentBelow = 0;
        
        eventsToShow.forEach((event, index) => {
            const eventEl = document.createElement('div');
            eventEl.className = `timeline-event event-${event.type}`;
            eventEl.setAttribute('data-year', event.year);
            eventEl.setAttribute('data-event-id', event.id);
            
            // Calculate position as a percentage across the timeline
            const position = this.calculatePosition(event.year);
            eventEl.style.left = `${position}%`;
            
            // More intelligent positioning to avoid overlaps
            let isTop = index % 2 === 0;
            
            // Use data attribute for position so we can style based on this
            if (isTop) {
                eventEl.classList.add('event-top');
                currentAbove++;
            } else {
                eventEl.classList.add('event-bottom');
                currentBelow++;
            }
            
            // Add staggered heights for events that would otherwise overlap
            if (index > 0) {
                const prevEvent = eventsToShow[index - 1];
                const prevPosition = this.calculatePosition(prevEvent.year);
                if (Math.abs(position - prevPosition) < 5) {
                    if (isTop) {
                        eventEl.style.height = `${30 + (currentAbove % 3) * 10}px`;
                    } else {
                        eventEl.style.height = `${30 + (currentBelow % 3) * 10}px`;
                    }
                }
            }
            
            eventEl.innerHTML = `
                <div class="event-marker"></div>
                <div class="event-content">
                    <h3>${event.year}: ${event.title}</h3>
                    <p>${event.summary}</p>
                    ${event.essayLink ? `<a href="#${event.essayLink}" class="event-link">Read more</a>` : ''}
                </div>
            `;
            
            timelineEl.appendChild(eventEl);
        });
        
        this.container.appendChild(timelineEl);
        
        // Add chart toggle button
        const chartToggle = document.createElement('div');
        chartToggle.className = 'chart-toggle';
        chartToggle.innerHTML = `
            <button id="showDataChart">
                <i class="fas fa-chart-line"></i> Show Data Trends
            </button>
        `;
        this.container.appendChild(chartToggle);
        
        // Hidden initially - will be shown when button is clicked
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        chartContainer.style.display = 'none';
        chartContainer.innerHTML = `
            <div class="chart-header">
                <h3>Student Debt Trends Over Time</h3>
                <div class="chart-controls">
                    <button data-chart="tuition">Tuition Costs</button>
                    <button data-chart="debt">Total Debt</button>
                    <button data-chart="borrowers">Number of Borrowers</button>
                </div>
            </div>
            <div class="chart-display">
                <p class="chart-placeholder">Select a data series to display</p>
            </div>
        `;
        this.container.appendChild(chartContainer);
        
        // Reattach event listeners after rendering
        this.setupEventListeners();
        
        // Adjust tooltip positions to ensure they're visible
        this.adjustTooltipPositions();
    }

    adjustTooltipPositions() {
        // Find all event tooltips and ensure they're visible within the viewport
        setTimeout(() => {
            const eventContents = this.container.querySelectorAll('.event-content');
            eventContents.forEach(content => {
                const rect = content.getBoundingClientRect();
                const parentEvent = content.closest('.timeline-event');
                
                // Check if the tooltip would go off the top of the viewport
                if (rect.top < 0) {
                    content.style.bottom = 'auto';
                    content.style.top = '25px';
                    if (parentEvent) parentEvent.classList.remove('event-top');
                    if (parentEvent) parentEvent.classList.add('event-bottom');
                }
                
                // Check if the tooltip would go off the left side
                if (rect.left < 0) {
                    content.style.transform = 'translateY(0)';
                    content.style.left = '0';
                }
                
                // Check if the tooltip would go off the right side
                if (rect.right > window.innerWidth) {
                    content.style.transform = 'translateY(0)';
                    content.style.right = '0';
                    content.style.left = 'auto';
                }
            });
        }, 100);
    }

    setupEventListeners() {
        // Filter checkboxes
        const filterInputs = this.container.querySelectorAll('.timeline-filters input');
        filterInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const filterType = e.target.getAttribute('data-filter');
                this.activeFilters[filterType] = e.target.checked;
                this.render();
            });
        });
        
        // Event click listeners
        const events = this.container.querySelectorAll('.timeline-event');
        events.forEach(event => {
            // Add hover handler for better mobile experience
            event.addEventListener('mouseenter', () => {
                this.container.querySelectorAll('.timeline-event').forEach(e => {
                    e.classList.remove('hover');
                });
                event.classList.add('hover');
            });
            
            event.addEventListener('mouseleave', () => {
                event.classList.remove('hover');
            });
            
            // Click handler
            event.addEventListener('click', () => {
                const eventId = event.getAttribute('data-event-id');
                this.showEventDetails(eventId);
            });
        });
        
        // Chart toggle
        const chartToggle = this.container.querySelector('#showDataChart');
        if (chartToggle) {
            chartToggle.addEventListener('click', () => {
                const chartContainer = this.container.querySelector('.chart-container');
                const isHidden = chartContainer.style.display === 'none';
                chartContainer.style.display = isHidden ? 'block' : 'none';
                chartToggle.innerHTML = isHidden ? 
                    '<i class="fas fa-times"></i> Hide Data Trends' : 
                    '<i class="fas fa-chart-line"></i> Show Data Trends';
            });
        }
        
        // Chart type buttons
        const chartButtons = this.container.querySelectorAll('.chart-controls button');
        chartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const chartType = e.target.getAttribute('data-chart');
                this.displayChart(chartType);
                
                // Update active button
                chartButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    showEventDetails(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;
        
        // Highlight the selected event
        const eventElements = this.container.querySelectorAll('.timeline-event');
        eventElements.forEach(el => el.classList.remove('active'));
        
        const selectedEvent = this.container.querySelector(`[data-event-id="${eventId}"]`);
        if (selectedEvent) {
            selectedEvent.classList.add('active');
            
            // Ensure the event is centered in the viewport horizontally
            const timelineWrapper = this.container.querySelector('.timeline-wrapper');
            if (timelineWrapper) {
                const timelineRect = timelineWrapper.getBoundingClientRect();
                const eventRect = selectedEvent.getBoundingClientRect();
                
                // Calculate how far to scroll to center the event
                const scrollLeft = eventRect.left - timelineRect.left - (timelineRect.width / 2) + (eventRect.width / 2);
                
                timelineWrapper.scrollTo({
                    left: timelineWrapper.scrollLeft + scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
        
        // If there's an essay link, scroll to that section
        if (event.essayLink) {
            const section = document.getElementById(event.essayLink);
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }
    }

    displayChart(chartType) {
        const chartDisplay = this.container.querySelector('.chart-display');
        if (!chartDisplay) return;
        
        // In a real implementation, this would render a chart using data
        // For now, just show a placeholder message
        chartDisplay.innerHTML = `
            <p>This would display the ${chartType} chart in a real implementation.</p>
            <p>The chart would show trends from 1965 to present day.</p>
        `;
    }

    calculatePosition(year) {
        // Calculate position as percentage across the timeline
        const startYear = this.events[0].year;
        const endYear = this.events[this.events.length-1].year;
        const range = endYear - startYear;
        
        return ((year - startYear) / range) * 100;
    }

    displayError() {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="timeline-error">
                <h3>Could not load timeline</h3>
                <p>There was a problem loading the timeline data. Please try again later.</p>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // This will be initialized from script.js
});
